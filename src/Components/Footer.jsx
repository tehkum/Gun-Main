import "./Footer.css";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import WebAssetIcon from "@mui/icons-material/WebAsset";

export default function Footer() {
  return (
    <div className="Footer-container">
      <div className="about-us-sec">
        <h2>About us</h2>
        <div>
          <p>
            Welcome to Gungun Boutique, your one-stop destination for all your
            tailoring needs. Whether you are looking for a blouse paper cutting
            pattern, a dress paper cutting pattern, or any other tailoring
            material, we have it all for you.
          </p>
          <p>
            At Gungun Boutique, we believe that everyone deserves to wear
            clothes that fit them perfectly and express their unique style.
            That’s why we offer a wide range of paper cutting patterns for
            different types of garments, such as saree blouses, kurtis, salwar
            suits, lehengas, gowns, and more. You can choose from various
            designs, sizes, and fabrics to suit your preferences and budget.
          </p>
        </div>
      </div>
      <hr />
      <div className="footer-icons">
        <a
          href="https://www.youtube.com/@Gungunsewingclasses"
          className="link-icon"
        >
          <YouTubeIcon />
        </a>
        <a
          href="https://www.facebook.com/GunGunBoutique/"
          className="link-icon"
        >
          <FacebookIcon />
        </a>
        <a
          href="https://www.facebook.com/GunGunBoutique/"
          className="link-icon"
        >
          <InstagramIcon />
        </a>
        <a
          href="https://www.facebook.com/GunGunBoutique/"
          className="link-icon"
        >
          <WebAssetIcon />
        </a>
      </div>
      <div className="footer-cpr">
        <p>copyright by gungun@2023</p>
      </div>
    </div>
  );
}
