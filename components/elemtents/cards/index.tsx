import ErrorAlertBox from "~/components/commons/ErrorAlertBox";
import { CardProps } from "./props";

export function DefaultCard(props: CardProps) {
    const { children, title, error, ...rest } = props;
    return (
        <div className="card  bg-base-100 w-full rounded-lg hover:shadow-xl">
            <div className="card-body p-8">
                {title && (
                    <>
                        <h2 className="card-title ">{title}</h2>
                        <div className="divider mt-0 mb-0.5"></div>
                    </>
                )}
                {/* */}

                {error && <ErrorAlertBox message={error} />}
                <div>{children}</div>
            </div>
        </div>
    );
}
