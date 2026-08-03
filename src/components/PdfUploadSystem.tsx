import React, { useState } from "react";
import { Upload, FileText, Download, Trash2, CheckCircle2, ArrowRight } from "lucide-react";

export interface UploadedPdf {
  id: string;
  name: string;
  size: string;
  date: string;
  url: string;
  category: string;
}

export function PdfUploadSystem() {
  const [pdfs, setPdfs] = useState<UploadedPdf[]>([
    {
      id: "1",
      name: "APV_ECell_Annual_Report_2025.pdf",
      size: "2.4 MB",
      date: "2026-07-28",
      url: "#",
      category: "Annual Reports",
    },
    {
      id: "2",
      name: "Pitchnova_Rulebook_and_Guidelines.pdf",
      size: "1.1 MB",
      date: "2026-07-15",
      url: "#",
      category: "Guidelines",
    },
  ]);

  const [dragActive, setDragActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Annual Reports");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newPdf: UploadedPdf = {
        id: Date.now().toString(),
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        date: new Date().toISOString().split("T")[0] ?? "2026-07-31",
        url: URL.createObjectURL(file),
        category: selectedCategory,
      };
      setPdfs([newPdf, ...pdfs]);
    }
  };

  const deletePdf = (id: string) => {
    setPdfs(pdfs.filter((p) => p.id !== id));
  };

  return (
    <div className="rounded-2xl border border-border bg-surface p-8 md:p-10 shadow-soft">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <span className="eyebrow">Document Repository</span>
          <h3 className="text-2xl font-serif text-foreground mt-1">
            E-Cell PDF Upload & Archive
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Share event rulebooks, reports, or incubation guidelines with the community.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs font-mono uppercase text-muted-foreground">Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-xs font-medium bg-background border border-border rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-ring"
          >
            <option value="Annual Reports">Annual Reports</option>
            <option value="Guidelines">Guidelines</option>
            <option value="Pitch Decks">Pitch Decks</option>
            <option value="Newsletters">Newsletters</option>
          </select>
        </div>
      </div>

      {/* Upload Drop Area */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            const newPdf: UploadedPdf = {
              id: Date.now().toString(),
              name: file.name,
              size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
              date: new Date().toISOString().split("T")[0] ?? "2026-07-31",
              url: URL.createObjectURL(file),
              category: selectedCategory,
            };
            setPdfs([newPdf, ...pdfs]);
          }
        }}
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
          dragActive
            ? "border-foreground bg-secondary/50"
            : "border-border/80 bg-background/50 hover:border-foreground/40"
        }`}
      >
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          id="pdf-upload"
        />
        <div className="flex flex-col items-center justify-center gap-3 pointer-events-none">
          <div className="w-12 h-12 rounded-full bg-surface border border-border flex items-center justify-center text-foreground">
            <Upload className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">
              Click to upload PDF or drag and drop
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Maximum file size 20MB (.pdf format only)
            </p>
          </div>
        </div>
      </div>

      {/* List of uploaded PDFs */}
      <div className="mt-8 space-y-3">
        <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
          Available Documents ({pdfs.length})
        </p>
        <div className="divide-y divide-hairline border-t border-b border-hairline">
          {pdfs.map((pdf) => (
            <div
              key={pdf.id}
              className="py-4 flex items-center justify-between gap-4 group hover:bg-background/40 transition-colors px-2 rounded-lg"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-foreground shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{pdf.name}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                    <span className="font-mono">{pdf.size}</span>
                    <span>•</span>
                    <span>{pdf.category}</span>
                    <span>•</span>
                    <span className="font-mono">{pdf.date}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={pdf.url}
                  download={pdf.name}
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  title="Download PDF"
                >
                  <Download className="w-4 h-4" />
                </a>
                <button
                  type="button"
                  onClick={() => deletePdf(pdf.id)}
                  className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                  title="Remove PDF"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
