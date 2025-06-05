import { CopyBlock, dracula } from 'react-code-blocks';
import { Button } from "./ui/button";
import { useEditor } from "@craftjs/core";
import { useRouter } from "next/router";

export const CodeView = ({ codeString }: { codeString?: string }) => {
  const router = useRouter();
  const { query } = useEditor((_, query) => ({ query }));

  const code = codeString
    ? codeString
    : // Initial code or a placeholder
      `
    import React from "react";\n\nconst Card = () => {\n  // Dummy data for the card\n  const title = "Example Card";\n  const description = "This is a simple card component in React with Tailwind CSS.";\n  const imageUrl = "https://example.com/example-image.jpg";\n\n  return (\n    <div className="max-w-sm rounded overflow-hidden shadow-lg">\n      <img className="w-full" src={imageUrl} alt={title} />\n      <div className="px-6 py-4">\n        <div className="font-bold text-xl mb-2">{title}</div>\n 
    <div className="font-bold text-xl mb-2">{title}</div>\n 
    <div className="font-bold text-xl mb-2">{title}</div>\n  
    <div className="font-bold text-xl mb-2">{title}</div>\n 
    
    <p className="text-gray-700 text-base">{description}</p>\n      </div>\n    </div>\n  );\n};\n\nexport default Card
      `;

  const downloadFile = () => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "code.tsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const publish = async () => {
    const slugFromQuery = router.query.slug;
    const slug = typeof slugFromQuery === "string" ? slugFromQuery : prompt("slug?") || undefined;

    if (!slug) {
      alert("Slug is required to publish");
      return;
    }

    try {
      const res = await fetch("/api/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, data: query.getNodes() }),
      });
      const json = await res.json();
      if (res.ok) {
        alert("✅ Publish succeeded: " + json.prUrl);
      } else {
        alert(json.error || "Publish failed");
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="rounded-md h-full border border-input flex flex-col">
      <div className="p-2 border-b flex gap-2">
        <Button size="sm" onClick={downloadFile}>Download .tsx</Button>
        <Button size="sm" variant="secondary" onClick={publish}>Publish</Button>
      </div>
      <div className="flex-1">
        <CopyBlock
          customStyle={{ height: "100%", overflow: "scroll" }}
          text={code}
          language={"typescript"}
          theme={dracula}
        />
      </div>
    </div>
  );
};
