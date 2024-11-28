// main.tsx or index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './routes/ErrorPage.tsx';
import Profile from './routes/Profile.tsx';
import Lobby from './routes/game/CampaignList.tsx';
import Home from './routes/Home.tsx';
import SpellList from './routes/compendium/SpellList.tsx';
import SpellInfo from './routes/compendium/SpellInfo.tsx';
import EquipmentInfo from './routes/compendium/EquipmentInfo.tsx';
import EquipmentList from './routes/compendium/EquipmentList.tsx';
// import MagicItemInfo from './routes/compendium/MagicItemInfo.tsx';
import MagicItemList from './routes/compendium/MagicItemList.tsx';
import RaceInfo from './routes/compendium/RaceInfo.tsx';
import RaceList from './routes/compendium/RaceList.tsx';
import ClassInfo from './routes/compendium/ClassInfo.tsx';
import ClassList from './routes/compendium/ClassList.tsx';
import RuleList from './routes/compendium/RuleList.tsx';
import RuleInfo from './routes/compendium/RuleInfo.tsx';
import HomebrewCreation from './routes/homebrew/HomebrewHome.tsx';
import CreateHomebrewRule from './routes/homebrew/HomebrewRuleCreation.tsx';
import CreateHomebrewSpell from './routes/homebrew/HomebrewSpellCreation.tsx';

import CharInfo from './routes/game/CharInfo.tsx';
import CharList from './routes/game/CharList.tsx';
import CharCreation from './routes/game/CharCreation.tsx';
import CampaignList from './routes/game/CampaignList.tsx';
import CampaignInfo from './routes/game/CampaignInfo.tsx';
import CampaignCreation from './routes/game/CampaignCreation.tsx';
import CampaignLobby from './routes/game/CampaignLobby.tsx';

const router = createBrowserRouter([
  {
    path: '/',

    element:                     <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/campaign_lobby',
        element: <Lobby />
      },
      {
        path: '/spells',
        children: [
          {
            path: '',
            element: <SpellList />
          },
          {
            path: ':spellId',
            element: <SpellInfo />
          }
        ]
      },
      {
        path: '/spell_info',
        element: <SpellInfo />
      },
      {
        path: '/equipment',
        children: [
          {
            path: '',
            element: <EquipmentList />
          },
          {
            path: ':equipmentId',
            element: <EquipmentInfo />
          }
        ]
      },
      {
        path: '/equipment_info',
        element: <EquipmentInfo />
      },
      {
        path: '/magic_item',
        children: [
          {
            path: '',
            element: <MagicItemList />
          }
        ]
      },
      {
        path: '/race',
        children: [
          {
            path: '',
            element: <RaceList />
          },
          {
            path: ':RaceId',
            element: <RaceInfo />
          }
        ]
      },
      {
        path: '/race_info',
        element: <RaceInfo />
      },
      {
        path: '/class',
        children: [
          {
            path: '',
            element: <ClassList />
          },
          {
            path: ':ClassId',
            element: <ClassInfo />
          }
        ]
      },
      {
        path: '/class_info',
        element: <ClassInfo />
      },
      {
        path: '/rules',
        children: [
          {
            path: '',
            element: <RuleList />
          },
          {
            path: ':rulesId',
            element: <RuleInfo />
          }
        ]
      },
      {
        path: '/rule_info',
        element: <RuleInfo />
      },
      {
        path: '/homebrew_creation',
        children: [
          {
            path: '',
            element: <HomebrewCreation />
          },
          {
            path: '/homebrew_creation/rules',
            element: (

                <CreateHomebrewRule />

            )
          },
          {
            path: '/homebrew_creation/spells',
            element: (

                <CreateHomebrewSpell />

            )
          }
        ]
      },
      {
        path: '/characters',
        children: [
          {
            path: '',
            element: <CharList />
          },
          {
            path: ':characterId',
            element: <CharInfo />
          }

        ]
      },
      {
        path: 'characters/creation',
        element: <CharCreation />
      },
      {
        path: '/campaigns',
        children: [
          {
            path: '',
            element: <CampaignList />
          },
          {
            path: ':campaignId',
            element: <CampaignInfo />
          }

        ]
      },
      {
        path: 'campaigns/creation',
        element: <CampaignCreation />
      },
      {
        path: 'campaigns/lobby',
        element: <CampaignLobby />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
