export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 bg-black text-white flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <img 
          src="/Loading.gif"
          alt=""
          style={{ 
            width: 'auto',
            height: '100vh',
            transform: 'scale(1)',
            
            // objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
      </div>
    </div>
  )
} 