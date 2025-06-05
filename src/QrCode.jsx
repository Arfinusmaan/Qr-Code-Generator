import { useState } from "react"


export const QrCode = () => {

  const [img,setImg] = useState('');
  const [loading, setLoading] = useState(false);
  const [qrData,setQrData] = useState('')
  const [qrSize,setQrSize] = useState('150')

  async function generateQr(){
    setLoading(true);
    try{
      const url=`https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`
      setImg(url)
    }
    catch(error){
      console.error("Error Generating QR Code",error)
    }
    finally{
      setLoading(false)
    }
  }
  function downloadQr(){
     fetch(img).then((response)=>response.blob()).then((blob)=>{
      const link=document.createElement("a");
      link.href=URL.createObjectURL(blob);
      link.download="qrcode.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link)
     }).catch((error)=>{
      console.error('Error Downloading Qr Code',error);
     })
   }

  return (
    <div className="app-container">
      <h1> QR CODE GENERATOR </h1>
      {img && <img src={img} className="qr-code-img" alt="" />}
      {loading && <p>Please wait...</p>}
      <div>
          <label htmlFor="datainput" className="input-label">
            Data For Qr Code
          </label>
          <input type="text" id="datainput" value={qrData} placeholder="enter data for qr code"  onChange={(e)=>setQrData(e.target.value)}/>
          <label htmlFor="sizeinput" className="input-label">
            Image size (e.g., 150)
          </label>
          <input type="text" id="sizeinput" value={qrSize} placeholder="enter image size" onChange={(e)=>setQrSize(e.target.value)} />
          
            <button className="generate-button" onClick={generateQr}>Generate Button</button>
            <button className="download-button" onClick={downloadQr}>Download Button</button>
  
          <p className="footer">Designed by <a href="#">Arfin Usmaan</a></p>

      </div>
    </div>
  )
}

