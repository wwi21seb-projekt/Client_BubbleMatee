<script lang="ts">
    import { Accordion, AccordionItem, Avatar, tableMapperValues } from '@skeletonlabs/skeleton';
    import { Table } from '@skeletonlabs/skeleton';
    import type { TableSource } from '@skeletonlabs/skeleton';

    //Tabelleninformationen
    const sourceDataEichberg = [
        { position: 1, description: 'Name', value: 'Herr Dr. Prof Eichberg'},
        { position: 2, description: 'Rolle', value: 'Projektbegleiter' },
        { position: 3, description: 'Modulleiter', value: 'Projektkonzeption' },
        { position: 4, description: 'Vorleungszeitraum', value: '5./6. Semester' },
    ];

    const sourceDataJonas = [
        { position: 1, description: 'Name', value: 'Jonas Braun'},
        { position: 2, description: 'Martriktelnummer', value: '6813146' },
        { position: 3, description: 'Hauptverantwortlichkeit', value: 'Build Prozess - CI/CD' },
        { position: 4, description: 'Stellvertreter', value: 'UI/UX' },
    ];
    
    const sourceDataPaul = [
        { position: 1, description: 'Name', value: 'Paul Bahde'},
        { position: 2, description: 'Martriktelnummer', value: '5584368' },
        { position: 3, description: 'Hauptverantwortlichkeit', value: 'Mock-Server' },
        { position: 4, description: 'Stellvertreter', value: 'Schnittstellenbeauftragter' },
    ];

    const sourceDataJohanna = [
        { position: 1, description: 'Name', value: 'Johanna Deike'},
        { position: 2, description: 'Martriktelnummer', value: 'xxxxxx' },
        { position: 3, description: 'Hauptverantwortlichkeit', value: 'UI/UX' },
        { position: 4, description: 'Stellvertreter', value: 'Mock-Server' },
    ];

    const sourceDataAidan = [
        { position: 1, description: 'Name', value: 'Aidan Zimmer'},
        { position: 2, description: 'Martriktelnummer', value: 'xxxxxxxx' },
        { position: 3, description: 'Hauptverantwortlichkeit', value: 'Schnittstellenbeauftragter' },
        { position: 4, description: 'Stellvertreter', value: 'Build Prozess - CI/CD' },
    ];
    
    // Hilfsfunktion zur Erstellung von TableSource-Objekten
    function createTableSource(data: { position: number; description: string; value: string }[]): TableSource {
        return {
            head: ['Bezeichnung', 'Beschreibung'],
            body: tableMapperValues(data, ['description', 'value']),
            meta: tableMapperValues(data, ['position', 'description', 'value']),
        };
    }

    //create TableSource Objekte
    const tableSimpleEichberg: TableSource = createTableSource(sourceDataEichberg);
    const tableSimplePaul: TableSource = createTableSource(sourceDataPaul);
    const tableSimpleJonas: TableSource = createTableSource(sourceDataJonas);
    const tableSimpleJohanna: TableSource = createTableSource(sourceDataJohanna);
    const tableSimpleAidan: TableSource = createTableSource(sourceDataAidan);

	//Inforamtionmapping	
    const unsplashIds = [
                        { id: 'Jp6O3FFRdEI', src: './src/routes/about/Professor.png', sourceData: tableSimpleEichberg },
                        { id: 'I3C_eojFVQY', src: './src/routes/about/Paul.png', sourceData: tableSimplePaul },
                        { id: 's0fXOuyTH1M', src: './src/routes/about/Jonas.png', sourceData: tableSimpleJonas },
                        { id: 'z_X0PxmBuIQ', src: './src/routes/about/Johanna.png', sourceData: tableSimpleJohanna },
                        { id: 'z_X0PxmBuIQ', src: './src/routes/about/Aidan.png', sourceData: tableSimpleAidan }
                        ]; 

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

<h1 class="h1">ABOUT US</h1>
<hr class="!border-t-8 !border-double" />
<Accordion>
	<AccordionItem open>
		<svelte:fragment slot="lead"><img src='./src/routes/about/team.png' alt="(icon-team)" class="icon-team"></svelte:fragment>
		<svelte:fragment slot="summary"><h2 class="h2">Projektbeteiligte</h2></svelte:fragment>
		<svelte:fragment slot="content">
            
        <div class="card p-4 grid grid-cols-[auto_1fr_auto] gap-4 items-center">
                <!-- Button: Left -->
                <button type="button" class="btn-icon variant-filled" on:click={carouselLeft}>
                    <img src='./src/routes/about/arrow-left.png' alt="DHBW Mannheim Logo" class="arrow-left">
                </button>
                <!-- Full Images -->
                <div bind:this={elemCarousel} class="snap-x snap-mandatory scroll-smooth flex overflow-x-auto">
                    {#each unsplashIds as unsplashId}
                      <div class="snap-center rounded-container-token carousel-item">
                        <!-- Bild-Teil der Karte -->
                        <div class="image-container">
                            <img
                                class="carousel-image"
                                src="{unsplashId.src}" 
                                alt={unsplashId.id}
                                loading="lazy"
                            />
                        </div>
                        <!-- Text-Teil der Karte -->
                        <div class="table-container">
                            <Table source={unsplashId.sourceData} />
                        </div>
                      </div>
                    {/each}
                  </div>
                <!-- Button: Right -->
                <button type="button" class="btn-icon variant-filled" on:click={carouselRight}>
                    <img src='./src/routes/about/arrow-right.png' alt="DHBW Mannheim Logo" class="arrow-right">
                </button>
            </div>
        </svelte:fragment>
	</AccordionItem>
	<AccordionItem>
		<svelte:fragment slot="lead"><img src='./src/routes/about/folders.png' alt="(icon-folders)" class="icon-folders"></svelte:fragment>
		<svelte:fragment slot="summary"><h2 class="h2">PROJEKTDOKUMENTATION</h2>
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
    <!-- svelte-ignore a11y-media-has-caption -->
    <AccordionItem>
		<svelte:fragment slot="lead"><img src='./src/routes/about/video-marketing.png' alt="(icon-video)" class="video-icon"></svelte:fragment>
		<svelte:fragment slot="summary"><h2 class="h2">PRODUKTVIDEO</h2>
    </svelte:fragment>
		<svelte:fragment slot="content">
            <video 
                src="pfad/zu/deinem/video.mp4" 
                width="640" 
                height="360" 
                controls
                poster="pfad/zu/deinem/poster.jpg">
                Dein Browser unterstützt das Video-Tag nicht.
            </video></svelte:fragment>
	</AccordionItem>
    <AccordionItem>
		<svelte:fragment slot="lead"><img src='./src/routes/about/law.png' alt="(icon-law)" class="icon-law"></svelte:fragment>
		<svelte:fragment slot="summary"><h2 class="h2">GESETZLICHE RICHTLINIEN</h2></svelte:fragment>
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


<hr class="!border-t-8 !border-double" />

<div class="logo-cloud grid grid-cols-1 lg:grid-cols-3 gap-4">
    <a class="logo-item flex flex-col items-center" href="https://www.mannheim.dhbw.de/startseite">
        <img src='./src/routes/about/DHBW.jpg' alt="DHBW Mannheim Logo" class="h-12 w-auto mb-2">
        <span>DHBW Mannheim</span>
    </a>
    <a class="logo-item flex flex-col items-center" href="https://www.instagram.com/">
        <img src='./src/routes/about/Instagram.png' alt="Instagram Logo" class="h-12 w-auto mb-2">
        <span>Instagram</span>
    </a>
    <a class="logo-item flex flex-col items-center" href="https://twitter.com/?lang=de">
        <img src='./src/routes/about/x.avif' alt="X Logo" class="h-12 w-auto mb-2">
        <span>X</span>
    </a>
    <!-- Weitere Logos... -->
</div>

<style>
  h1 {
    text-align: center;
    margin-top: 2rem; /* Abstand nach oben */
    margin-bottom: 2rem; /* Abstand nach unten */
  }
  .h1 {
    font-size: 3rem; /* Große Schriftgröße */
    color: #007bff; /* Lebendige Farbe */
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6); /* Textschatten für Tiefe */
    text-align: center; /* Zentriert den Text */
  }
  .h1 {
    transition: transform 0.3s ease-in-out;
    &:hover {
        transform: scale(1.1); /* Skaliert die Überschrift beim Hovern */
  }
}

  hr {
    border-top: 8px double; /* Stil der Linie */
    margin-top: 2rem; /* Abstand nach oben */
    margin-bottom: 2rem; /* Abstand nach unten */
  }
  .carousel-item {
    display: flex;
    flex-direction: row;
    width: 100%; /* Breite der Karte entsprechend der Karussellbreite */
    justify-content: center; /* Zentriert den Text horizontal im Container */
    min-width: 600px;
    margin-right: 20px; /* Fügt rechts von jedem Element einen Abstand hinzu */
    margin-left: 20px; /* Fügt links von jedem Element einen Abstand hinzu */
  }

  .table-container {
    text-align: left; /* Zentriert den Textinhalt */
    width: 100%; /* Beide Container nehmen die volle Breite ein */
    word-wrap: break-word; /* Fügt Textumbruch hinzu */
    min-width: 400px;
    min-height: 300px;
  }

  .image-container {
    width: 100%;
    display: flex;
    justify-content: center; 
    min-width: 200px;
    min-height: 200px;
  }

  .carousel-image {
    border-radius: 50%; /* Optional: Passen Sie den Wert für einen weniger kreisförmigen Effekt an */
    overflow: hidden;
    width: 100%; /* Bild nimmt die volle Breite des Containers ein */
    height: auto; /* Behält das Seitenverhältnis des Bildes bei */
    object-fit: cover; /* Stellt sicher, dass das Bild den Container voll ausfüllt, ohne das Seitenverhältnis zu verzerren */
    max-width: 200px;
    max-height: 200px;
    justify-content: center;
  }
  .logo-cloud {
    display: flex; /* Aktiviert Flexbox */
    justify-content: center; /* Zentriert die Flex-Items horizontal */
    align-items: center; /* Zentriert die Flex-Items vertikal */
    flex-wrap: wrap; /* Erlaubt den Flex-Items umzubrechen, falls notwendig */
  }

  .logo-item {
    margin: 0.5rem; /* Fügt Abstand um jedes Logo-Item hinzu */
    /* Weitere Stile, falls benötigt */
  }

  /* Falls Sie die Icons innerhalb der .logo-item auch zentrieren möchten */
  .logo-item > span {
    display: block; /* Macht jeden Span zu einem Block-Element */
    text-align: center; /* Zentriert den Text innerhalb des Span */
  }

  .icon-team, .icon-folders, .video-icon, .icon-law {
    height: 35px; /* Anpassung der Höhe */
    width: 35px;  /* Anpassung der Breite */
  }

  </style>