import React from 'react';
import { HashRouter as Router, Route } from "react-router-dom";
import './portfolio.css';
import { Nav } from './nav';
import { Index } from './routes';
import { Group } from './routes/group';
import { View } from './routes/view';

import portfolio from './portfolio.json';

export interface IImage {
  id: string;
  name: string;
  url: string;
}

export interface IGroup {
  id: string;
  name: string;
  images: IImage[];
}

export interface IPortfolioState {
  groups: IGroup[];
  highlightedGroupId?: string;
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
      case 'HIGHLIGHT_GROUP': {
        setPortfolioState({
          groups: portfolioState.groups,
          highlightedGroupId: payload
        });
        break;
      }
      case 'UNHIGHLIGHT_GROUP': {
        setPortfolioState({
          groups: portfolioState.groups
        });
        break;
      }
    }
    console.log(type, payload);
  }, [portfolioState, setPortfolioState]);

  return (
    <PortfolioContext.Provider value={{ state: portfolioState, dispatch }}>
      <Router>
        <section>
          <h1>Olha Danylchenko</h1>
          <Nav />
          <main>
            <Route path="/" exact component={Index} />
            <Route path="/:groupId" component={Group} />
            <Route path="/:groupId/:imageId" component={View} />
          </main>
        </section>
      </Router>
    </PortfolioContext.Provider>
  );
}
