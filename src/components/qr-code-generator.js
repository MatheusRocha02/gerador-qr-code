import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import QRCode from 'react-qr-code';

const Generator = () => {
    const [url, setUrl] = useState("");
    const [showQRCode, setShowQRCode] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [downloadErrorMessage, setDownloadErrorMessage] = useState(""); // Novo estado para erro de download

    const isValidURL = (string) => {
        const res = string.match(/^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/[^\s]*)?$/i);
        return (res !== null);
    };

    const handleGenerate = () => {
        if (isValidURL(url)) {
            setShowQRCode(true);
            setErrorMessage("");
            setDownloadErrorMessage(""); // Limpa a mensagem de erro de download
        } else {
            setErrorMessage("Por favor, insira uma URL válida.");
            setShowQRCode(false);
            setDownloadErrorMessage(""); // Limpa a mensagem de erro de download
        }
    };

    const downloadQRCode = () => {
        if (!showQRCode) { // Verifica se o QR Code foi gerado
            setDownloadErrorMessage("Por favor, gere um QR Code antes de tentar baixar."); // Define a mensagem de erro
            return; // Sai da função se não houver QR Code
        }

        const svg = document.getElementById('qr-code').querySelector('svg');
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        const img = new Image();
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0);
            URL.revokeObjectURL(url);

            const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
            const downloadLink = document.createElement("a");
            downloadLink.href = pngUrl;
            downloadLink.download = "qr-code.png";
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        };

        img.src = url;
    };

    return (
        <div className="flex flex-col items-center">
            <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://exemplo.com"
                className="border rounded indent-2 shadow px-2 py-1 mb-3 w-[70dvw] placeholder:italic md:max-w-lg outline-none"
            />
            {errorMessage && (
                <p className="text-red-500">{errorMessage}</p>
            )}
            {downloadErrorMessage && (
                <p className="text-red-500">{downloadErrorMessage}</p> // Mensagem de erro de download
            )}
            {showQRCode && (
                <div id="qr-code">
                    <QRCode value={url} />
                </div>
            )}
            <div className="flex flex-row gap-3 justify-end mt-4">
                <button className="text-lg px-4 py-1 shadow rounded hover:opacity-25 bg-blue-100" onClick={handleGenerate}>
                    Gerar
                </button>
                <button className="border text-lg px-4 py-1 shadow rounded flex gap-2 items-center hover:opacity-25 bg-blue-50" onClick={downloadQRCode}>
                    <p>Download</p>
                    <FontAwesomeIcon icon={faDownload} />
                </button>
            </div>
        </div>
    );
};

export default Generator;
