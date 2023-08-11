import { CardProps } from "./props";

export function DefaultCard(props: CardProps) {
    const { children, title, error, ...rest } = props;
    // Render
    return (
        <div className="w-full bg-white border border-gray-200 rounded-lg shadow p-4">
            <div className="card-body p-4">
                {title && <h2 className="card-title ">{title}</h2>}
                {/* <div className="divider mt-0 mb-0.5"></div> */}

                {error && (
                    <div className="alert alert-error mb-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="stroke-current shrink-0 h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span>{error}</span>
                    </div>
                )}
                <div>{children}</div>
            </div>
        </div>
    );
}
