import Link from 'next/link';
import { Button } from 'primereact/button';


export interface PButtonProps {
  label: string;
  isLink: boolean;
  href?: string;
};

const PButton = ({
  label,
  isLink=false,
  href=""
}: PButtonProps) => {
  
  if (isLink) {
    return (
      // utilize primereact classes so we can have a semantic link-button that is still rendered as anchor.
      // prime-react has "link" attribute for button, but that just changes the styling. it doesnt render anchor
      <Link
        className='p-button p-component'
        href={href}
      >
        <span className='p-button-label p-c'>
          {label}
        </span>
      </Link>
    );
  }
  else {
    return (
      <Button 
        label={label}
        link={false}
      />
    )
  };
}

export default PButton;