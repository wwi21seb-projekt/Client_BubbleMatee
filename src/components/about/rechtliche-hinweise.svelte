<script lang="ts">
	import { AccordionItem } from '@skeletonlabs/skeleton';
</script>

<AccordionItem>
	<svelte:fragment slot="lead"
		><img src="./src/images/about/law.png" alt="(icon-law)" class="icon-law" /></svelte:fragment
	>
	<svelte:fragment slot="summary"
		><h2 class="h2">
			<span
				class="bg-gradient-to-br from-red-500 to-yellow-500 bg-clip-text text-transparent box-decoration-clone"
				>Gesetzliche Richtlinien</span
			>
		</h2></svelte:fragment
	>
	<svelte:fragment slot="content">
		<blockquote class="blockquote">
			<h3>Rechtlicher Hinweis</h3>
			<p>
				Dies ist ein Studentenprojekt und ist im Rahmen des Moduls Projektkonzeption an der Dualen
				Hochschule Baden Württemberg Mannheim entstanden. Alle Inhalte und Materialien, die im
				Rahmen dieses Projekts bereitgestellt werden, dienen ausschließlich Bildungszwecken.
			</p>

			<p>
				<strong>Haftungsausschluss:</strong> Die Projektteilnehmer, Tutoren und die Bildungseinrichtung
				übernehmen keine Haftung für die Korrektheit, Vollständigkeit und Aktualität der bereitgestellten
				Inhalte. Jegliche Nutzung der auf diesen Seiten dargestellten Informationen erfolgt auf eigenes
				Risiko des Nutzers.
			</p>
		</blockquote>
	</svelte:fragment>
</AccordionItem>

<style>
	.icon-law {
		height: var(--logo-icon-size);
		width: var(--logo-icon-size);
	}
</style>
