import { Link } from "react-router";

export default function GreenhousesPage() {
    return (
        <div className="z-50">
            Greenhouses Page
            <br></br>
            <Link to={"/dashboard/greenhouses/98da09s8d09a8d0a98"}>Greenhouse 1</Link>
        </div>
    );
}
