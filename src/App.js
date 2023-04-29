import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Home from './components/pages/home/home.js';
import New from './components/pages/new/New.js';
import Slide1 from './components/pages/slide1/Slide1.js';
import ChickenFarm from './components/pages/slide2/ChickenFarm.js';
import NewChickenFarm from './components/pages/slide2/ChickenFarmData.js';
import Slide3 from './components/pages/slide3/Slide3.js';
import Fslide1 from './components/pages/farmslide/fslide1.js';
import Fslide2 from './components/pages/farmslide/fslide2.js';
import Fslide3 from './components/pages/farmslide/fslide3.js';
import Choose from './components/pages/choose/choose.js';
import Marketplace2 from './components/pages/marketplace/newmarketplace.js';
import Step from './components/pages/formstep/step.js';
import Elements from './components/pages/marketplace/elements';
import Staking from './components/pages/slide3/Stake'
import KingGame from './components/pages/KingGame/KingGame.js';
import GameCenter from './components/pages/GameCenter/GameCenter.js';
import PigFarm from './components/pages/slide2/PigFarm';
import NewMarketplace from './components/pages/newmarketplace/Marketplace';
import Product from './components/pages/product/Product';
import Create from './components/pages/create/create';
import Single from './components/pages/single/single'
import Multiple from './components/pages/multiple/multiple'
import Swap from './components/pages/swap/Swap';
import Choosemarketplace from './components/pages/choosemarketplace/choosemarketplace';



// const PrivateRoute = ({ component: Component, ...rest }) => (
// 	<Route {...rest} render={(props) => (
// 		localStorage.getItem('ACCESS_ID') != null ? <Redirect to='/' /> : <Component {...props} />
// 	)} />
// )

function App() {


	return (

		<BrowserRouter>
			<Routes>
				{/* <Route exact path="/" element={<Dashboard />} /> */}
				<Route path="/" name="Home Page" element={<Choose />} />
				<Route path="/new" element={<New />} />
				<Route path="/king-game" element={<KingGame />} />
				<Route path="/game-center" element={<GameCenter />} />
				<Route path="/slide1" element={<Slide1 />} />
				<Route path="/Slide3" element={<Slide3 />} />
				<Route path="/fslide1" element={<Fslide1 />} />
				<Route path="/fslide2" element={<Fslide2 />} />
				<Route path="/fslide3" element={<Fslide3 />} />
				<Route path="/step" element={<Step />} />
				<Route path="/pig-farming" element={<PigFarm />} />
				<Route path="/chicken-farming" element={<ChickenFarm />} />
				<Route path="/chicken-farming-data" element={<NewChickenFarm />} />
				<Route path="/choose" element={<Choose />} />
				<Route path="/marketplace" element={<Marketplace2 />} />
				<Route path="/buy/:key" element={<Elements />} />
				<Route path="/staking" element={<Staking />} />
				<Route path="/nft/marketplace" element={<NewMarketplace />} />
				<Route path="/product/:tradeid" element={<Product />} />
				<Route path="/create" element={<Create />} />
				<Route path="/single" element={<Single />} />
				<Route path="/multiple" element={<Multiple />} />
				<Route path="/swap" element={<Swap />} />
				<Route path="/choosemarketplace" element={<Choosemarketplace />} />



			</Routes>
		</BrowserRouter>
	);
}
export default App;
