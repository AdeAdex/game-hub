import React  from 'react'
import Navbar from '../../navbar/Navbar'
import { useSearch } from '@/app/lib/SearchContext';
import GameExplorer from '../../homePage/GameExplorer';
import Footer from '../../footer/Footer';
import ScrollToTop from '@/app/utils/ScrollToTop';
import SideBarCompo from './SideBarCompo';
import { Game } from '@/app/types/homePage/games';
import GameCard from '../../homePage/GameCard';

interface SideBarPagesProps {
  games: Game[]; // Updated to accept an array of games
}

const SideBarPages: React.FC<SideBarPagesProps> = ({ games }) => {
  const { handleSearch, suggestions } = useSearch();
  

  return (
        <div>
        <Navbar onSearch={handleSearch} suggestions={suggestions} />
        <main
          className={`w-100 h-screen flex flex-col md:flex-row w-full pt-[50px] md:pt-[75px] relative dark:bg-dark-mode bg-light-mode`}
        >
          <SideBarCompo />
          <section
            className={`mt-1 w-full md:w-[83%] md:ml-[16.6%] dark:bg-dark-mode light-mode-section`}
          >
            <div
              className={`py-[30px] px-[30px] dark:bg-dark-mode light-mode-section`}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {games && games.length > 0 ? (
                games.map((game) => (
                  <GameCard key={game.id} game={game} />
                ))
              ) : (
                <p>No games found with tag "</p>
              )}
  
              </div>
             <GameExplorer/>
            </div>
            <Footer />
          </section>
          <ScrollToTop />
        </main>
      </div>
  )
}

export default SideBarPages