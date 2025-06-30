import '../global.css';
import MainNavigator from '../screen/BottomTabs';


//import Try from '../screen/try';
// import MainNavigator from '@/screen/BottomTabs';
// import { NavigationContainer } from '@react-navigation/native';
 import { IngredientProvider } from '../context/IngredientContext';
import { GluestackUIProvider } from '../src/components/ui/gluestack-ui-provider';
	
export default function App() {
  return (
   <GluestackUIProvider>
      <IngredientProvider>
        <MainNavigator/>
      </IngredientProvider>
      
    </GluestackUIProvider>
     
      
  );
}