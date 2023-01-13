import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { StateContext } from './context/StateContext';
import { BrowserRouter } from 'react-router-dom';
import { DataContext } from './context/DataContext';
import { AuthContext } from './context/AuthContext';
import { ThemeProvider } from '@material-tailwind/react';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
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
							<Toaster />
							<ScrollToTop>
								<App />
							</ScrollToTop>
						</ThemeProvider>
					</DataContext>
				</StateContext>
			</AuthContext>
		</BrowserRouter>
		<ReactQueryDevtools initialIsOpen={false} position="bottom-left" />
	</QueryClientProvider>
);
