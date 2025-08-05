
import Layout from "../components/Layout";
import Greeting from "../components/Greeting";
import WeatherCard from "../components/WeatherCard";
import MarketHighlights from "../components/MarketHighlights";
import ExpensesChart from "../components/ExpensesChart";
import CropHealth from "../components/CropHealth";
import WeatherForecast from "../components/WeatherForecast";
import MarketPricesTable from "../components/MarketPrices";
import RecentActivities from "../components/RecentActivities";
import QuickActions from "../components/QuickActions";
import FarmingTip from "../components/FarmingTip";
import ActiveSchemes from "../components/ActiveSchemes";
import WeatherAlerts from "../components/WeatherAlerts";

function Dashboard() {
    return (
        <Layout>
            <div className="container mx-auto px-4 py-6">
                <div className="mb-6">
                    <Greeting />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                        <WeatherCard />
                        <MarketHighlights />
                        <ExpensesChart />
                        <CropHealth />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    <div className="lg:col-span-2">
                        <WeatherForecast />
                    </div>
                    <div>
                        <MarketPricesTable />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    <div>
                        <RecentActivities />
                    </div>
                    <div>
                        <QuickActions />
                    </div>
                    <div className="space-y-6">
                        <FarmingTip />
                        <ActiveSchemes />
                        <WeatherAlerts />
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Dashboard;