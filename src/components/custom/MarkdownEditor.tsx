import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import { FaBold, FaItalic, FaStrikethrough, FaImage, FaEye } from "react-icons/fa";
import { marked } from "marked";
import useModal from "@/hooks/useModal";

// Markdown için line breaks aktif hale getiriliyor
marked.setOptions({
    breaks: true, // Satır sonlarında <br> ekler
});

const MarkdownEditor = () => {
    const [markdownText, setMarkdownText] = useState<string>(""); // Markdown içeriği
    const [previewMode, setPreviewMode] = useState<boolean>(false); // Önizleme modu kontrolü

    const { showModal, closeModal } = useModal()

    // Metni Markdown etiketi ile sarmalar veya imleç konumuna ekler
    const insertText = (syntax: string, endSyntax: string = "") => {
        const textarea = document.getElementById("markdown-textarea") as HTMLTextAreaElement;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        if (start === end) {
            // Eğer bir metin seçili değilse
            const newText = `${syntax}${endSyntax}`;
            setMarkdownText(
                textarea.value.substring(0, start) + newText + textarea.value.substring(end)
            );

            // İmleci eklenen etiketlerin ortasına taşı
            setTimeout(() => {
                textarea.selectionStart = textarea.selectionEnd = start + syntax.length;
                textarea.focus();
            }, 0);
        } else {
            // Eğer bir metin seçiliyse
            const selectedText = textarea.value.substring(start, end);
            const newText = `${syntax}${selectedText}${endSyntax}`;
            setMarkdownText(
                textarea.value.substring(0, start) + newText + textarea.value.substring(end)
            );

            setTimeout(() => textarea.focus(), 0);
        }
    };

    // Markdown içeriğini HTML'ye dönüştürme
    const renderPreview = () => {
        return { __html: marked(markdownText) }; // breaks:true ile satır sonu desteklenir
    };

    const handleImageInsertButton = () => {
        let imageURL = "";
        showModal("Resim ekle", "",
            <div className="w-full flex flex-col gap-3">
                <Input type="text" placeholder="Resim URL'si" onChange={(e) => imageURL = e.target.value} />
                <Button onClick={() => {
                    setMarkdownText((prev) => `${prev}![Image](${imageURL})`)
                    closeModal()
                }}>Ekle</Button>
            </div>
        );
    };

    return (
        <div className="w-full">
            {/* Araç Çubuğu */}
            <div className="flex flex-wrap gap-2 mb-2">
                <Button onClick={() => insertText("**", "**")} className="text-xs"><FaBold /></Button>
                <Button onClick={() => insertText("_", "_")} className="text-xs"><FaItalic /></Button>
                <Button onClick={() => insertText("~~", "~~")} className="text-xs"><FaStrikethrough /></Button>
                <Button onClick={handleImageInsertButton} className="text-xs"><FaImage /></Button>
                <Button onClick={() => setPreviewMode(!previewMode)} className="text-xs">
                    <FaEye /> {previewMode ? "Düzenle" : "Önizleme"}
                </Button>
            </div>

            {/* Markdown Giriş Alanı */}
            {!previewMode ? (
                <Textarea
                    id="markdown-textarea"
                    value={markdownText}
                    onChange={(e) => setMarkdownText(e.target.value)}
                    className="w-full min-h-[200px] border rounded p-2 focus:outline-none"
                    placeholder="Soru içeriğinizi buraya yazın..."
                />
            ) : (
                <div
                    className="w-full min-h-[200px] border rounded p-2"
                    dangerouslySetInnerHTML={renderPreview()}
                />
            )}
        </div>
    );
};

export default MarkdownEditor;