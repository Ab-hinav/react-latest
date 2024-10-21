import Link from './Link';
import useNavigation from '../hooks/useNavigation';
function Sidebar() {

    const links = [
        {label: 'Accordion', to: '/accordion'},
        {label: 'Button', to: '/button'},
        {label: 'Dropdown', to: '/'},
        {label: 'Model', to: '/model'},
        {label: 'Table', to: '/table'},
        {label: 'Counter', to: '/counter'}
    ]

    const {currentPath} = useNavigation();

   const renderLinks = links.map((link) => {

         
            if(link.to === currentPath) {
                return (
                    <Link className="text-center m-3 active font-bold" to={link.to} key={link.to}>
                        {link.label}
                    </Link>
                )
            }else{
                return (
                    <Link className="text-center m-3" to={link.to} key={link.to}>
                        {link.label}
                    </Link>
                )
            }
        
    })


    return (
        <div className='sticky top-0 overflow flex flex-col overflow-y-scroll '  >
            {renderLinks}
        </div>
    )


}

export default Sidebar;