import { useGlobalDataStore } from "../../stores";
import './Footer.scss';

export default function Footer() {

    const {siteName} = useGlobalDataStore();

    return (
        <footer>
            <div className="content">
                <p>{siteName} - 2024</p>
            </div>
        </footer>
    )
}