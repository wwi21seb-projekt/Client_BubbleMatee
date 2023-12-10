<script lang="ts">
    import { Accordion, AccordionItem, tableMapperValues } from '@skeletonlabs/skeleton';
    import { Table } from '@skeletonlabs/skeleton';
    import type { TableSource } from '@skeletonlabs/skeleton';

    // Definieren einer Schnittstelle für Personendaten
    interface PersonData {
        position: number;
        description: string;
        value: string;
    }

    // Definieren einer Schnittstelle für die Quelldaten der Personen
    interface PersonSourceData {
        id: string;
        src: string;
        data: PersonData[];
    }

    interface Logo {
        name: string;
        url: string;
        src: string;
        description: string;
    }

    // Zentrale Datenquelle für alle Personen
    const personsData: PersonSourceData[] = [
        {
            id: 'Jp6O3FFRdEI',
            src: './src/routes/about/Professor.png',
            data: [
                { position: 1, description: 'Name', value: 'Herr Dr. Prof Eichberg'},
                { position: 2, description: 'Rolle', value: 'Projektbegleiter' },
                { position: 3, description: 'Modulleiter', value: 'Projektkonzeption' },
                { position: 4, description: 'Vorleungszeitraum', value: '5./6. Semester' },
            ],
        },
        {
            id: 'I3C_eojFVQY',
            src: './src/routes/about/Paul.png',
            data: [
                { position: 1, description: 'Name', value: 'Paul Bahde'},
                { position: 2, description: 'Martriktelnummer', value: '5584368' },
                { position: 3, description: 'Hauptverantwortlichkeit', value: 'Mock-Server' },
                { position: 4, description: 'Stellvertreter', value: 'Schnittstellenbeauftragter' },
            ],
        },
        {
            id: 'Jp6O3FFRdEI',
            src: './src/routes/about/Jonas.png',
            data: [
                { position: 1, description: 'Name', value: 'Jonas Braun'},
                { position: 2, description: 'Martriktelnummer', value: '6813146' },
                { position: 3, description: 'Hauptverantwortlichkeit', value: 'Build Prozess - CI/CD' },
                { position: 4, description: 'Stellvertreter', value: 'UI/UX' },
            ],
        },
        {
            id: 'Jp6O3FFRdEI',
            src: './src/routes/about/Johanna.png',
            data: [
                { position: 1, description: 'Name', value: 'Johanna Deike'},
                { position: 2, description: 'Martriktelnummer', value: 'xxxxxx' },
                { position: 3, description: 'Hauptverantwortlichkeit', value: 'UI/UX' },
                { position: 4, description: 'Stellvertreter', value: 'Mock-Server' },
            ],
        },
        {
            id: 'Jp6O3FFRdEI',
            src: './src/routes/about/Aidan.png',
            data: [
                { position: 1, description: 'Name', value: 'Aidan Zimmer'},
                { position: 2, description: 'Martriktelnummer', value: 'xxxxxxxx' },
                { position: 3, description: 'Hauptverantwortlichkeit', value: 'Schnittstellenbeauftragter' },
                { position: 4, description: 'Stellvertreter', value: 'Build Prozess - CI/CD' },
            ],
        },
        // Weitere Personen...
    ];

    // Erstellen einer Sammlung von Logos
    const logos: Logo[] = [
        {
            name: 'DHBW Mannheim',
            url: 'https://www.mannheim.dhbw.de/startseite',
            src: './src/routes/about/DHBW.jpg',
            description: 'DHBW Mannheim Logo'
        },
        {
            name: 'Instagram',
            url: 'https://www.instagram.com/',
            src: './src/routes/about/Instagram.png',
            description: 'Instagram Logo'
        },
        {
            name: 'Twitter',
            url: 'https://twitter.com/?lang=de',
            src: './src/routes/about/x.avif',
            description: 'Twitter Logo'
        },
        // Fügen Sie hier weitere Logos hinzu...
    ];
    
    // Hilfsfunktion zur Erstellung von TableSource-Objekten
    function createTableSource(data: PersonData[]): TableSource {
        return {
            head: ['Bezeichnung', 'Beschreibung'],
            body: tableMapperValues(data, ['description', 'value']),
            meta: tableMapperValues(data, ['position', 'description', 'value']),
        };
    }

    // Erstellen der TableSource Objekte für jede Person in einer Map
    const tableSources = personsData.map(person => ({
        ...person,                                      //person übernimmt die gesamte map aus personsData
        table: createTableSource(person.data)           //fügt ein Element durch die Funktion hinzu
    }));

    //Karusellelement
    let elemCarousel: HTMLDivElement;

    // Karussell-Navigationsfunktionen

    function carouselMove(direction: 'left' | 'right'): void {
        const step = elemCarousel.clientWidth;
        const maxScroll = elemCarousel.scrollWidth - step;
        let newX = direction === 'left'
            ? Math.max(0, elemCarousel.scrollLeft - step)
            : Math.min(maxScroll, elemCarousel.scrollLeft + step);
        
        elemCarousel.scroll(newX, 0);
    }

    function carouselLeft(): void {
        carouselMove('left');
    }

    function carouselRight(): void {
        carouselMove('right');
    }               
</script>

<h1 class="h1">
	<span class="bg-gradient-to-br from-blue-500 to-cyan-300 bg-clip-text text-transparent box-decoration-clone">ABOUT US</span>
</h1>
<hr class="!border-t-8" />
<Accordion>
    <!-- Team -->
	<AccordionItem open>
		<svelte:fragment slot="lead"><img src='./src/routes/about/team.png' alt="(icon-team)" class="icon-team"></svelte:fragment>
		<svelte:fragment slot="summary"><h2 class="h2"><span class="bg-gradient-to-br from-red-500 to-yellow-500 bg-clip-text text-transparent box-decoration-clone">Projektbeteiligte</span></h2></svelte:fragment>
		<svelte:fragment slot="content"> 
        <!-- Karusell-->
        <div class="card p-4 grid grid-cols-[auto_1fr_auto] gap-4 items-center">
                <!-- Button: Left -->
                <button type="button" class="btn-icon variant-filled" on:click={carouselLeft}>
                    <img src='./src/routes/about/arrow-left.png' alt="DHBW Mannheim Logo">
                </button>
                <!-- Karte bestehend aus tabelle und bild -->
                <div bind:this={elemCarousel} class="snap-x snap-mandatory scroll-smooth flex overflow-x-auto">
                    {#each tableSources as source}
                        <div class="snap-center rounded-container-token carousel-item">
                            <!-- Bild-Teil der Karte -->
                            <div class="image-container">
                                <img
                                    class="carousel-image"
                                    src={source.src} 
                                    alt={source.id}
                                    loading="lazy"
                                />
                            </div>
                            <!-- Text-Teil der Karte -->
                            <div class="table-container">
                                <Table source={source.table} />
                            </div>
                        </div>
                        <span class="divider-vertical h-72" />
                    {/each}
                  </div>
                <!-- Button: Right -->
                <button type="button" class="btn-icon variant-filled" on:click={carouselRight}>
                    <img src='./src/routes/about/arrow-right.png' alt="DHBW Mannheim Logo">
                </button>
            </div>
        </svelte:fragment>
	</AccordionItem>
    <!-- Dokumentationen -->
	<AccordionItem>
		<svelte:fragment slot="lead"><img src='./src/routes/about/folders.png' alt="(icon-folders)" class="icon-folders"></svelte:fragment>
		<svelte:fragment slot="summary"><h2 class="h2"><span class="bg-gradient-to-br from-red-500 to-yellow-500 bg-clip-text text-transparent box-decoration-clone">Dokumentation</span></h2>
        </svelte:fragment>
		<svelte:fragment slot="content">
            <blockquote class="blockquote">
                <h3>Projektdokumentation</h3>
                <p>
                    Das Hauptrepository unseres Projekts <strong>"Client_BubbleMatee"</strong>, welches den gesamten Code und die dazugehörigen Materialien beinhaltet, finden Sie auf GitHub unter dem folgenden Link:
                    <a href="https://github.com/wwi21seb-projekt/Client_BubbleMatee" target="_blank" style="text-decoration: underline;">Client_BubbleMatee Repository</a>.
                </p>
                <p>
                    Ergänzend dazu umfasst unser Dokumentationsrepository <strong>"Documentation_Client_BubbleMatee"</strong> die gesamte Projektplanung und Prüfungsleistungen, einschließlich der Präsentationen. Dieses bietet einen umfassenden Einblick in die konzeptionelle Arbeit unseres Teams:
                    <a href="https://github.com/wwi21seb-projekt/Documentation_Client_BubbleMatee" target="_blank" style="text-decoration: underline;">Documentation_Client_BubbleMatee Repository</a>.
                </p>
                <p>
                    Wir ermutigen alle Interessierten, die Repositories zu besuchen und einen tiefgreifenden Einblick in unser Projekt zu gewinnen. Für Fragen, Feedback und Anregungen sind wir stets offen und dankbar.
                </p>
            </blockquote>
        </svelte:fragment>
	</AccordionItem>
    <!-- Produktvideo -->
    <!-- svelte-ignore a11y-media-has-caption -->
    <AccordionItem>
		<svelte:fragment slot="lead"><img src='./src/routes/about/video-marketing.png' alt="(icon-video)" class="video-icon"></svelte:fragment>
		<svelte:fragment slot="summary"><h2 class="h2"><span class="bg-gradient-to-br from-red-500 to-yellow-500 bg-clip-text text-transparent box-decoration-clone">Produktvideo</span></h2>
    </svelte:fragment>
		<svelte:fragment slot="content">
            <video 
                src="pfad/zu/deinem/video.mp4"
                controls
                poster="pfad/zu/deinem/poster.jpg">
                Dein Browser unterstützt das Video-Tag nicht.
            </video>
        </svelte:fragment>
	</AccordionItem>
    <!-- Rechtliche Hinweise -->
    <AccordionItem>
		<svelte:fragment slot="lead"><img src='./src/routes/about/law.png' alt="(icon-law)" class="icon-law"></svelte:fragment>
		<svelte:fragment slot="summary"><h2 class="h2"><span class="bg-gradient-to-br from-red-500 to-yellow-500 bg-clip-text text-transparent box-decoration-clone">Gesetzliche Richtlinien</span></h2></svelte:fragment>
		<svelte:fragment slot="content">
            <blockquote class="blockquote">
                <h3>Rechtlicher Hinweis</h3>
                <p>Dies ist ein Studentenprojekt und ist im Rahmen des Moduls Projektkonzeption an der Dualen Hochschule Baden Württemberg Mannheim entstanden. Alle Inhalte und Materialien, die im Rahmen dieses Projekts bereitgestellt werden, dienen ausschließlich Bildungszwecken.</p>
                
                <p><strong>Haftungsausschluss:</strong> Die Projektteilnehmer, Tutoren und die Bildungseinrichtung übernehmen keine Haftung für die Korrektheit, Vollständigkeit und Aktualität der bereitgestellten Inhalte. Jegliche Nutzung der auf diesen Seiten dargestellten Informationen erfolgt auf eigenes Risiko des Nutzers.</p>
            </blockquote>
        </svelte:fragment>
	</AccordionItem>
	<!-- ... -->
</Accordion>

<!-- Trennline -->
<hr class="!border-t-8 !border-double" />

<!-- Logos dhbw insta x -->
<div class="logo-cloud grid grid-cols-1 lg:grid-cols-3 gap-4">
    {#each logos as logo}
    <a class="logo-item flex flex-col items-center" href={logo.url}>
        <img src={logo.src} alt={logo.description} class="h-12 w-auto mb-2">
        <span>{logo.name}</span>
    </a>
    {/each}
    <!-- Weitere Logos... -->
</div>

<style>
    /* Definition von CSS-Variablen für wiederkehrende Werte */
    :root {
      --primary-color: #007bff; /* Hauptfarbe der Anwendung */
      --line-color: #a0a0a0; /* Graue Farbe für Linien */
      --text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6); /* Schatten für Text */
      --default-margin: 2rem; /* Standardaußenabstand */
      --default-font-size-large: 3rem; /* Standardgröße für große Schrift */
      --carousel-item-min-width: 600px; /* Mindestbreite für Karussell-Elemente */
      --carousel-item-margin: 20px; /* Außenabstand für Karussell-Elemente */
      --table-container-min-width: 400px; /* Mindestbreite für Tabellencontainer */
      --table-container-min-height: 300px; /* Mindesthöhe für Tabellencontainer */
      --image-container-min-width: 200px; /* Mindestbreite für Bildcontainer */
      --image-container-min-height: 200px; /* Mindesthöhe für Bildcontainer */
      --carousel-image-max-width: 200px; /* Maximale Breite für Karussell-Bilder */
      --carousel-image-max-height: 200px; /* Maximale Höhe für Karussell-Bilder */
      --logo-icon-size: 35px; /* Größe für Logo-Icons */
      --logo-item-margin: 0.5rem; /* Außenabstand für Logo-Elemente */
    }

    /* Stile für h1-Elemente */
    .h1 {
      font-size: var(--default-font-size-large);
      text-align: center;
      margin-top: var(--default-margin);
      margin-bottom: var(--default-margin);
      transition: transform 0.3s ease-in-out; /* Übergangseffekt für Maus-Hover */
    }

    .h1:hover {
      transform: scale(1.1); /* Vergrößern beim Hovern */
    }

    /* Stile für horizontale Linien (hr) */
    hr {
      border-top: 8px double var(--line-color); /* Doppelte Linie mit grauer Farbe */
      margin-top: var(--default-margin);
      margin-bottom: var(--default-margin);
    }

    /* Stile für Karussell-Elemente */
    .carousel-item {
      display: flex;
      flex-direction: row;
      width: 100%;
      justify-content: center;
      min-width: var(--carousel-item-min-width);
      margin-right: var(--carousel-item-margin);
      margin-left: var(--carousel-item-margin);
    }

    /* Stile für Tabellencontainer */
    .table-container {
      text-align: left;
      width: 100%;
      word-wrap: break-word;
      min-width: var(--table-container-min-width);
      min-height: var(--table-container-min-height);
    }

    /* Stile für Bildcontainer */
    .image-container {
      width: 100%;
      display: flex;
      justify-content: center;
      min-width: var(--image-container-min-width);
      min-height: var(--image-container-min-height);
    }

    /* Stile für Bilder im Karussell */
    .carousel-image {
      border-radius: 50%;
      overflow: hidden;
      width: 100%;
      height: auto;
      object-fit: cover; /* Sorgt dafür, dass das Bild den Container ausfüllt */
      max-width: var(--carousel-image-max-width);
      max-height: var(--carousel-image-max-height);
    }

    /* Stile für den Logo-Bereich */
    .logo-cloud {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
    }

    /* Stile für einzelne Logo-Elemente */
    .logo-item {
      margin: var(--logo-item-margin);
    }

    /* Stile für Text innerhalb der Logo-Elemente */
    .logo-item > span {
      display: block;
      text-align: center;
    }

    /* Stile für verschiedene Icons */
    .icon-team, .icon-folders, .video-icon, .icon-law {
      height: var(--logo-icon-size);
      width: var(--logo-icon-size);
    }

    /* Media Query für kleine Bildschirme (z.B. Mobiltelefone) */
    @media (max-width: 600px) {
        :root {
          --default-font-size-large: 2rem; /* Kleinere Schriftgröße für mobile Geräte */
          --carousel-item-min-width: 360px; /* Vollständige Breite auf kleinen Bildschirmen */
          --carousel-item-margin: 5px; /* Geringerer Abstand für Karussell-Elemente */
          --table-container-min-width: 150px; /* Anpassung der Mindestbreite für Tabellencontainer */
          --table-container-min-height: 150px; /* Anpassung der Mindesthöhe für Tabellencontainer */
          --image-container-min-width: 150px; /* Anpassung der Mindestbreite für Bildcontainer */
          --image-container-min-height: 150px; /* Anpassung der Mindesthöhe für Bildcontainer */
          --carousel-image-max-width: 150px; /* Kleinere Maximalbreite für Bilder */
          --carousel-image-max-height: 150px; /* Kleinere Maximalhöhe für Bilder */
          --logo-item-margin: 0.25rem; /* Geringerer Abstand für Logos */
          --logo-icon-size: 25px; /* Kleinere Größe für Icons */
        }

        .h1 {
            font-size: 2rem; /* Kleinere Schriftgröße für Überschriften */
        }

        .h2{
            font-size: 1.5rem; /* Kleinere Schriftgröße für Überschriften */
        }
        .h1, .h2 {
            word-wrap: break-word; /* Erzwingt den Zeilenumbruch innerhalb des Containers */
            overflow-wrap: break-word; /* Alternative Eigenschaft für Zeilenumbruch */
        }

        .carousel-image {
            width: 150px; /* Verringerte Größe für Bilder und Icons */
            height: 150px;
        }

        .icon-team, .icon-folders, .video-icon, .icon-law {
            display: none;
        }

        .carousel-item {
          flex-direction: column; /* Ändert die Ausrichtung der Flex-Items */
        }

        .logo-item {
            margin: 0.2rem; /* Kleinerer Abstand */
        }

        /* Anpassungen für Text und Buttons */
        p, button {
            font-size: 0.9rem; /* Kleinere Schriftgröße für normalen Text und Buttons */
        }

        .logo-item > span {
          font-size: 0.8rem; /* Kleinere Schriftgröße für Logo-Text */
        }

        .btn-icon{
            display: none;
        }
    }

</style>

