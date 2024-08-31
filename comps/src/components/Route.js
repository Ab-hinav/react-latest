import useNavigation from '../hooks/useNavigation';

function Route({children,path}) {

    const {currentPath} = useNavigation();
  
    return (currentPath === path) ? children : null;

}

export default Route;


