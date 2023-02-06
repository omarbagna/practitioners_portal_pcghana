import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { StateContext } from './context/StateContext';
import { BrowserRouter } from 'react-router-dom';
import { DataContext } from './context/DataContext';
import { AuthContext } from './context/AuthContext';
import { ThemeProvider } from '@material-tailwind/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from 'react-query';
//import { ReactQueryDevtools } from 'react-query/devtools';
import ScrollToTop from './components/scrollToTop/ScrollToTop';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<QueryClientProvider client={queryClient}>
		<BrowserRouter>
			<AuthContext>
				<StateContext>
					<DataContext>
						<ThemeProvider>
							<ScrollToTop>
								<App />
							</ScrollToTop>
							<ToastContainer
								position="top-right"
								autoClose={8000}
								hideProgressBar={false}
								newestOnTop={false}
								closeOnClick
								rtl={false}
								pauseOnFocusLoss
								draggable
								pauseOnHover
								theme="colored"
							/>
						</ThemeProvider>
					</DataContext>
				</StateContext>
			</AuthContext>
		</BrowserRouter>
		{/*<ReactQueryDevtools initialIsOpen={false} position="bottom-left" />*/}
	</QueryClientProvider>
);
