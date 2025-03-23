import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { marked } from "marked";
import { Bold, Eye, Italic, Pen, Strikethrough } from "lucide-react";

// Markdown için line breaks aktif hale getiriliyor
marked.setOptions({
    breaks: true, // Satır sonlarında <br> ekler
});

const MarkdownEditor = ({ placeholder, defaultValue, onValueChange }: { placeholder: string, defaultValue: string, onValueChange: (value: string) => void }) => {
    const [markdownText, setMarkdownText] = useState<string>(defaultValue); // Markdown içeriği
    const [previewMode, setPreviewMode] = useState<boolean>(false); // Önizleme modu kontrolü

    // Metni Markdown etiketi ile sarmalar veya imleç konumuna ekler
    const insertText = (syntax: string, endSyntax: string = "") => {
        const textarea = document.getElementById("body") as HTMLTextAreaElement;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const value = textarea.value;

        if (start === end) {
            // Eğer bir metin seçili değilse
            const newText = `${syntax}${endSyntax}`;
            setMarkdownText(value.substring(0, start) + newText + value.substring(end));
            onValueChange(value.substring(0, start) + newText + value.substring(end));

            // İmleci eklenen etiketlerin ortasına taşı
            setTimeout(() => {
                textarea.selectionStart = textarea.selectionEnd = start + syntax.length;
                textarea.focus();
            }, 0);
        } else {
            // Eğer bir metin seçiliyse
            const selectedText = value.substring(start, end);
            const newText = `${syntax}${selectedText}${endSyntax}`;
            setMarkdownText(value.substring(0, start) + newText + value.substring(end));
            onValueChange(value.substring(0, start) + newText + value.substring(end));

            setTimeout(() => {
                textarea.selectionStart = start + syntax.length;
                textarea.selectionEnd = start + syntax.length + selectedText.length;
                textarea.focus();
            }, 0);
        }
    };

    // Markdown içeriğini HTML'ye dönüştürme
    const renderPreview = () => {
        return { __html: marked(markdownText) }; // breaks:true ile satır sonu desteklenir
    };

    return (
        <div className="w-full">
            {/* Araç Çubuğu */}
            <div className="flex flex-wrap gap-2 mb-2">
                <Button
                    type="button"
                    onClick={() => insertText("**", "**")}
                    className="text-xs"
                >
                    <Bold />
                </Button>
                <Button
                    type="button"
                    onClick={() => insertText("_", "_")}
                    className="text-xs"
                >
                    <Italic />
                </Button>
                <Button
                    type="button"
                    onClick={() => insertText("~~", "~~")}
                    className="text-xs"
                >
                    <Strikethrough />
                </Button>
                {
                    /*
                                    <Button
                    type="button"
                    onClick={handleImageInsertButton}
                    className="text-xs"
                >
                    <Image />
                </Button>
                    */
                }
                <Button
                    type="button"
                    onClick={() => setPreviewMode(!previewMode)}
                    className="text-xs"
                >
                    {previewMode ? <Pen /> : <Eye />}
                </Button>
            </div>

            {/* Markdown Giriş Alanı */}
            {!previewMode ? (
                <Textarea
                    id="body"
                    value={markdownText}
                    onChange={(e) => {
                        setMarkdownText(e.target.value)
                        onValueChange(e.target.value)
                    }}
                    className="w-full min-h-[200px] border rounded p-2 focus:outline-none"
                    placeholder={placeholder}
                />
            ) : (
                <div
                    className="w-full min-h-[200px] border rounded p-2 overflow-x-clip"
                    dangerouslySetInnerHTML={renderPreview()}
                />
            )}
        </div>
    );
};

export default MarkdownEditor;