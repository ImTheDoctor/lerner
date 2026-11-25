import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { createRoot } from 'react-dom/client';
import './styles.css';

const A = '/assets/expedition/';

function Icon({ name }) {
  const shapes = {
    clock: <><circle cx="20" cy="20" r="13"/><path d="M20 12v9l6 4"/></>,
    boot: <path d="M7 9c4 1 7 3 8 7l1 4c2 1 6 1 8 2l-1 4H6c-2 0-3-2-1-4l4-4-3-3 1-6Z"/>,
    fork: <><path d="M12 5v7m0 0c0 3 2 4 4 4v9M12 12c-2 0-4-2-4-5m4 5c2 0 4-2 4-5"/><path d="M22 5v7c0 2-1 3-3 3"/></>,
    music: <><path d="M12 7v14"/><path d="M12 7l10-3v13"/><ellipse cx="8" cy="22" rx="4" ry="3"/><ellipse cx="18" cy="18" rx="4" ry="3"/></>,
    van: <><path d="M4 11h14l4 4v7H4z"/><path d="M4 15h18M9 11v4M18 15v7"/><circle cx="9" cy="23" r="2"/><circle cx="19" cy="23" r="2"/></>,
  };
  return <svg className="line-icon" viewBox="0 0 40 40" aria-hidden="true">{shapes[name]}</svg>;
}

function MountainMark({ small = false, className = '' }) { return <svg className={`${small ? 'mountain-mark small' : 'mountain-mark'} ${className}`.trim()} viewBox="0 0 200 90" aria-hidden="true"><path d="M10 77 59 20l20 25 25-33 76 65"/><path d="m92 77 25-38 17 19 13-14 38 33"/><path d="M53 27h13M115 18h19"/></svg>; }

function App() {
  const heroPhotoRef = useRef(null);
  const finalPhotoRef = useRef(null);

  useEffect(() => {
    const photo = heroPhotoRef.current;
    const hero = photo?.closest('.hero');
    const finalPhoto = finalPhotoRef.current;
    const final = finalPhoto?.closest('.final');
    if ((!photo || !hero) && (!finalPhoto || !final) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let frame = 0;
    const updateParallax = () => {
      frame = 0;
      if (photo && hero) {
        const { top, bottom } = hero.getBoundingClientRect();
        if (bottom >= 0 && top <= window.innerHeight) {
          const offset = Math.min(Math.max(-top * 0.24, 0), 78);
          photo.style.setProperty('--hero-parallax-y', `${offset}px`);
        }
      }

      if (finalPhoto && final) {
        const { top, height, bottom } = final.getBoundingClientRect();
        if (bottom >= 0 && top <= window.innerHeight) {
          const progress = Math.min(Math.max((window.innerHeight - top) / (window.innerHeight + height), 0), 1);
          finalPhoto.style.setProperty('--final-parallax-y', `${Math.round((progress - 0.5) * 58)}px`);
        }
      }
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const lenis = new Lenis({
      anchors: true,
      lerp: 0.075,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });
    let frame = 0;
    const raf = (time) => {
      lenis.raf(time);
      frame = window.requestAnimationFrame(raf);
    };
    frame = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  const details = [
    ['🕖', <>Հավաքը՝ առավոտյան 07:00-ին, Երիտասարդական մետրոյի մոտ։</>],
    ['👟', <>Հագուստը՝ տաք, հարմարավետ, լեռնային ոճով։ Խորհուրդ ենք տալիս հարմար կոշիկներ։</>],
    ['🍽️', <>Սնունդը ինչ կբերեք + հյուրասիրություն։😉</>],
    ['🎶', <>Տրամադրությունը՝ ցուրտ-արշավային։</>],
    ['🚐', <>Տրանսպորտի և մեկնելու մանրամասները՝ կհայտնենք տեղում։</>],
  ];
  const gallery = [
    ['gallery-overlook.png', 'Հայկական լեռների հեռանկար'],
    ['gallery-hikers.png', 'Երկուսով՝ լեռների լռության մեջ'],
    ['gallery-grass.png', 'Ոսկեգույն արահետի մի պահ'],
    ['gallery-crags.png', 'Քարե գագաթներ ամպերի մեջ'],
  ];
  return <main>
    <section className="hero section-reveal" id="top">
      <img ref={heroPhotoRef} className="hero-photo" src={A + 'hero-mountain.png'} alt="Արշավականներ հայկական լեռնաշղթայի արահետին՝ արևածագին" />
      <div className="topo topo-hero" aria-hidden="true" />
      <div className="hero-content">
        <MountainMark className="hero-sign" />
        <div className="hero-title"><span>EXPEDITION</span><strong>ՀԱՐՍԱՆԻՔ</strong></div>
        <div className="hero-meta">
          <div className="hero-rule" />
          <div className="hero-info">
            <p>🏔️ Ռուդոլֆ & Մելինե</p>
            <p>Կհանդիպենք լեռներում։ <span className="heart">💚</span></p>
            <p>📅 29.11.26</p>
            <p>📍 Երանոսի լեռներ</p>
          </div>
        </div>
        <a className="scroll-cue" href="#invitation"><span>scroll</span><b>↓</b></a>
      </div>
    </section>

    <section className="paper section-reveal" id="invitation">
      <div className="topo topo-paper" aria-hidden="true" />
      <div className="paper-inner">
        <article className="invitation-copy">
          <h1>Սիրելի՛ լեռնասեր ընկերներ,</h1>
          <p>Սիրելով լեռները՝ չէինք կարող մեր սիրո ամենակարևոր օրը չտոնել լեռներում։🏔️</p>
          <p>Սիրով հրավիրում ենք ձեզ մեզ հետ տոնելու մեր սիրո օրը։ Մեզ սպասվում է լեռնային մի գեղեցիկ հանդիպում՝ լի երաժշտությամբ, համեղ հյուրասիրությամբ, պարերով, ժպիտներով ու անմոռանալի պահերով։</p>
          <p>Եկե՛ք միասին ստեղծենք մի հիշողություն, որը միշտ մեզ հետ կմնա։ <span className="heart">💚</span></p>
        </article>
        <img className="stamp" src={A + 'expedition-stamp.svg'} alt="Expedition Հարսանիք լեռնային կնիք" />
      </div>
      <div className="details-block">
        <h2>Մի քանի կարևոր մանրուք մեր արկածի համար՝</h2>
        <div className="detail-list">{details.map(([icon, text], i) => <div className="detail-row" key={i}><span className="icon-well emoji-icon" aria-hidden="true">{icon}</span><span>{text}</span></div>)}</div>
      </div>
      <div className="gallery">{gallery.map(([src, alt], i) => <figure className={'photo photo-' + (i + 1)} key={src}><img src={A + src} alt={alt} loading="lazy" /><span className="photo-tape" aria-hidden="true" /></figure>)}</div>
    </section>

    <section className="final section-reveal" id="final">
      <img ref={finalPhotoRef} className="final-photo" src={A + 'sunset-panorama.png'} alt="Հայկական լեռների մայրամուտի համայնապատկեր" loading="lazy" />
      <div className="final-overlay" />
      <div className="final-copy"><MountainMark /><p>Սպասում ենք ձեզ՝ մեր օրը միասին տոնելու։</p><div className="final-line" /><span>Սիրով՝</span><strong>Ռուդոլֆ & Մելինե <span className="heart">💚</span></strong></div>
    </section>
  </main>;
}

createRoot(document.getElementById('root')).render(<App />);
