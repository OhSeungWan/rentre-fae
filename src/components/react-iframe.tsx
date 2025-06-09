import type { ReactNode, IframeHTMLAttributes } from "react";
import { useState, useCallback, useLayoutEffect } from "react";
import { createPortal } from "react-dom";

interface ReactIframeProps extends IframeHTMLAttributes<HTMLIFrameElement> {
  children: ReactNode;
  title: string;
}

export const ReactIframe = ({
  children,
  title,
  ...props
}: ReactIframeProps) => {
  const [contentRef, setContentRef] = useState<HTMLIFrameElement | null>(null);
  const mountNode = contentRef?.contentWindow?.document?.body;
  const iframeDoc = contentRef?.contentWindow?.document;

  useLayoutEffect(() => {
    if (!iframeDoc) return;

    // 1) 부모 헬퍼 CSS(<link>)를 iframe의 head에 복제
    // 예: '/_next/static/css/tailwind.css' 또는 'http://localhost:3000/tailwind.css' 등
    const parentCssLinks = document.head.querySelectorAll(
      'link[rel="stylesheet"]'
    );
    parentCssLinks.forEach((link) => {
      const cloned = link.cloneNode(true) as HTMLLinkElement;
      iframeDoc.head.appendChild(cloned);
    });

    // 2) inline <style> 태그(Preflight나 Custom CSS)도 복제
    document.head.querySelectorAll("style").forEach((styleEl) => {
      iframeDoc.head.appendChild(styleEl.cloneNode(true));
    });

    // 3) 필요하다면 meta 태그도 복제
    document.head.querySelectorAll("meta").forEach((metaEl) => {
      iframeDoc.head.appendChild(metaEl.cloneNode(true));
    });

    // CDN 스크립트는 더 이상 필요 없으므로 주석 처리하거나 제거합니다.
    // const tailwindScript = document.createElement("script");
    // tailwindScript.src = "https://cdn.tailwindcss.com";
    // iframeDoc.head.appendChild(tailwindScript);

    // 4) iframe body에 overflow-hidden 클래스 등 추가
    iframeDoc.body.classList.add("overflow-hidden");
  }, [iframeDoc]);

  const mountRef = useCallback((node: HTMLIFrameElement | null) => {
    setContentRef(node);
  }, []);

  return (
    <iframe title={title} id="canvas-iframe" {...props} ref={mountRef}>
      {mountNode && createPortal(children, mountNode)}
    </iframe>
  );
};
