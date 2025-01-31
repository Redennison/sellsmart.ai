export default function FooterModal({ title, description, setShowFooterModal }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-8 rounded-lg max-w-md">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-gray-300 mb-6">{description}</p>
        <button
          onClick={() => setShowFooterModal(false)}
          className="bg-[rgb(106,168,79)] hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
        >
          Close
        </button>
      </div>
    </div>
  )
}
