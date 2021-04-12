

export default function Navigation({ children }) {
    return (
        <div className="my-12 mx-4 flex justify-center">
            <div className="object-center border border-black shadow-md max-w-xl flex-grow py-4 rounded-md"  >



                {children}

            </div>
        </div>
    )
}
