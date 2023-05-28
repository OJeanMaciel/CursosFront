import './Footer.css';
import { Link } from "react-router-dom";
import { GithubOutlined, FacebookFilled, InstagramFilled } from '@ant-design/icons';

function Footer() {
  return (
    <div className='containerFooter'>
      <div>
        <Link className='icons' to='https://github.com/OJeanMaciel' target='_blank'>
          <GithubOutlined style={{ margin: '15px' }} />
        </Link>
        <Link className='icons' to='https://www.facebook.com/jean.kevin.18/' target='_blank'>
          <FacebookFilled style={{ margin: '15px' }}/>
        </Link>
        <Link className='icons' to='https://www.instagram.com/jean.maciel_/' target='_blank'>
          <InstagramFilled style={{ margin: '15px' }}/>
        </Link>
      </div>
    </div>
  );
}

export default Footer;
