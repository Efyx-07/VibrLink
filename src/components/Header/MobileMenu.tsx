import './MobileMenu.scss';

interface MobileMenuProps {
    isOpen: boolean;
}

export default function MobileMenu({isOpen}: MobileMenuProps) {

    return (
        <div className={`mobile-menu ${!isOpen ? "hidden-menu" : ""}`}>
        </div>
    )
}