import logo from "../assets/images/logo.svg";
import units from "../assets/images/icon-units.svg";
import dropdownIcon from "../assets/images/icon-dropdown.svg";
export default function Header() {
  return (
    <header className="text-neutral-000 flex items-center justify-between p-4">
      <a href="#">
        <div>
          <img src={logo} alt="logo" />
        </div>
      </a>
      <button className="flex cursor-pointer items-center gap-2 rounded-[4px] bg-neutral-800 px-2 py-1">
        <div>
          <img src={units} alt="units-icon" />
        </div>
        <p>units</p>
        <div>
          <img src={dropdownIcon} alt="dropdown icon" />
        </div>
      </button>
    </header>
  );
}
