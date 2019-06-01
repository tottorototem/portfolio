import React from 'react';
import { HashRouter as Router, Route } from "react-router-dom";
import './portfolio.css';
import { Nav } from './nav';
import { Index } from './routes';
import { Group } from './routes/group';
import { View } from './routes/view';

import portfolio from './portfolio.json';

export interface IImage {
  id: number;
  name: string;
  url: string;
}

export interface IGroup {
  id: number;
  name: string;
  images: IImage[];
}

export interface IPortfolioState {
  groups: IGroup[];
}

export interface IPortfolioContext {
  state: IPortfolioState;
  dispatch: (type: string, payload?: any) => void;
}

export const PortfolioContext = React.createContext<IPortfolioContext>({ state: portfolio as IPortfolioState, dispatch: () => { } });

export const Portfolio: React.FC = () => {
  const [portfolioState, setPortfolioState] = React.useState<IPortfolioState>(portfolio as any as IPortfolioState);

  const dispatch = React.useCallback((type: string, payload?: any) => {
    switch (type) {
      case 'RESET': {
        setPortfolioState({
          groups: portfolioState.groups
        });
        break;
      }
    }
  }, [portfolioState, setPortfolioState]);

  return (
    <Router>
      <section>
        <Nav />
        <PortfolioContext.Provider value={{ state: portfolioState, dispatch }}>
          <main>
            <Route path="/" exact component={Index} />
            <Route path="/:groupId" component={Group} />
            <Route path="/:groupId/:imageId" component={View} />
          </main>
        </PortfolioContext.Provider>
      </section>
    </Router>
  );
}
