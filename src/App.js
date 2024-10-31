import Generator from "./components/qr-code-generator";



function App() {
  return (
   <div className="flex flex-col items-center justify-center w-full h-screen bg-custom-gradient">
      <h1 className="text-2xl mb-24 font-ibm">
        Gerar QR Code
      </h1>
      <p className="text-lg mb-3 font-ibm opacity-75">Insira a url</p>
      <Generator />
   </div>
  );
}

export default App;
