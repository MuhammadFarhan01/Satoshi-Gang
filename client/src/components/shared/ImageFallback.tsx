
function ImageWithFallback({ random_number, name }: { random_number: number, name: string }) {

  return (
    <div className="relative w-full h-full">
      <div className={`size-10 flex justify-center items-center ${random_number===1?'bg-orange-800': random_number===2?'bg-yellow-800': random_number===3?'bg-purple-800': random_number===4?'bg-cyan-800': 'bg-slate-800'}  overflow-hidden relative rounded-full text-xl text-white`}>
        <p className="font-poppins uppercase text-xl">
          {name?.slice(0, 2)}
        </p>
      </div>
    </div>
  );
}

export default ImageWithFallback;