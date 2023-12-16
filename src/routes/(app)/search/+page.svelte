<script>
	import { Posts } from "$components";    
    //temporär zum testen
    let data = [
  { imageUrl: "src/images/about/DHBW.jpg", text: 'Die DHBW bietet praxisnahe Ausbildung. Studierende wechseln zwischen Theorie- und Praxisphasen,schaffen vielfältige Karriere möglichkeiten durch Zusammenarbeit mit Unternehmen und innovative Lehrmethoden. 123456789101111jghjhjzughgh' },
  { imageUrl: "", text: 'Die DHBW bietet praxisnahe Ausbildung. Studierende wechseln zwischen Theorie- und Praxisphasen,schaffen vielfältige Karriere möglichkeiten durch Zusammenarbeit mit Unternehmen und innovative Lehrmethoden. 123456789101111jghjhjzughgh' },
  { imageUrl: 'src/images/about/DHBW.jpg', text: '' }];

  
    function loadMoreData() {
        data = data.concat(data);
  }
  
  </script>

<Posts data={data} loadData={loadMoreData}></Posts>
    