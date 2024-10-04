import AppError from "@/error/AppError";
import { Button } from "antd";
import { HouseIcon } from "lucide-react";
import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError() as AppError;

    return (
        <main className="h-screen flex flex-col justify-center items-center gap-4">
            {/* Status Code */}
            <h1 className="font-bold text-8xl text-foreground/80 font-leckerli">
                {error?.status || 500}
            </h1>

            {/* Message */}
            <h2 className="font-semibold text-3xl text-foreground/80">
                {error?.statusText || "Something Went Wrong!"}
            </h2>

            {/* Actions */}
            <div className="flex gap-4">
                <Link to="/">
                    <Button className="flex items-center gap-2">
                        <HouseIcon size={16} />
                        Go Home
                    </Button>
                </Link>
            </div>
        </main>
    );
}
