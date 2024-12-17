import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { FaAlignCenter, FaAlignLeft, FaAlignRight, FaBold, FaImage, FaItalic, FaStrikethrough } from "react-icons/fa";
import useModal from "@/hooks/useModal";

const MarkdownEditor = () => {
    const editorRef = useRef<HTMLElement>(null); // contenteditable alan referansı
    const { showModal, closeModal } = useModal()
    const [imageURL, setImageURL] = useState<string>(""); // Resim URL

    // Seçili metni HTML etiketi ile sarmalar
    const formatSelection = (command: string, value: string = "") => {
        document.execCommand(command, false, value); // Tarayıcı API'sini kullanarak biçimlendirme
        editorRef.current?.focus(); // Düzenleme alanına odaklan
    };

    // Resim ekleme işlemi
    const handleImageInsert = () => {
        if (imageURL.trim() !== "") {
            console.log(imageURL)
            formatSelection("insertHTML", `<img src="${imageURL}" alt="Image" style="max-width:100%;"/>`);
            closeModal()
            setImageURL(""); // URL temizle
        }
    };

    const addImage = () => {
        showModal("Resim ekle", "",
            <div className="w-full flex flex-col gap-3">
                <Input onChange={(e) => setImageURL(e.target.value)} type="text" placeholder="Resim URL'si" />
                <Button onClick={handleImageInsert}>Ekle</Button>
            </div>
        )
    }

    return (
        <div className="w-full">
            {/* Araç Çubuğu */}
            <div className="flex gap-2 mb-2">
                <Button onClick={() => formatSelection("bold")} className="text-xs"><FaBold /></Button>
                <Button onClick={() => formatSelection("italic")} className="text-xs"><FaItalic /></Button>
                <Button onClick={() => formatSelection("strikeThrough")} className="text-xs"><FaStrikethrough /></Button>
                <Button onClick={() => formatSelection("justifyLeft")} className="text-xs"><FaAlignLeft /></Button>
                <Button onClick={() => formatSelection("justifyCenter")} className="text-xs"><FaAlignCenter /></Button>
                <Button onClick={() => formatSelection("justifyRight")} className="text-xs"><FaAlignRight /></Button>
                <Button onClick={addImage} className="text-xs"><FaImage /></Button>
            </div>

            {/* contenteditable Alanı */}
            <div
                ref={editorRef}
                contentEditable={true}
                className="w-full min-h-[200px] border rounded p-2 focus:outline-none"
            />
        </div>
    );
};

export default MarkdownEditor;