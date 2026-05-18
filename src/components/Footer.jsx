function Footer() {
    return (
        <footer className="border-top py-3 mt-auto">
            <div className="container text-center text-secondary small">
                &copy; {new Date().getFullYear()} MyApp
            </div>
        </footer>
    );
}

export default Footer;
