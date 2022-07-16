import {Link} from "react-router-dom";

function SettingsTemplate(props) {

    return (
        <main className="flex-grow-1 py-3 row mx-0">
            <aside className="col-3 border-end">
                <nav className="flex-column nav nav-pills align-items-stretch">
                    {props.nav.map(d =>
                        <Link key={d.id} id={d.id} className="nav-link mb-2 menu" style={{cursor: "pointer"}}
                              to={"/settings/" + d.id}>{d.name}</Link>
                    )}
                </nav>
            </aside>
            <div className="col-9 px-0">
                {props.children}
            </div>
        </main>
    );

}

export default SettingsTemplate;
