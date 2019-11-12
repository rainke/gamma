import Gamma from 'gamma';

// @ts-ignore
import data from './data.json';

fetch('./data.json').then(res => res.json()).then(data => {
  var g = new Gamma({
    graph: { nodes: data.nodes, links: data.links },
    container: '#mount',
    graphSettings: {
      hoverLabel: 'id'
    },
    height: 500,
    onEnd() {
      console.log('end');
    },
    legend: [{
      color: 'red',
      name: '老师'
    }, {
      color: 'blue',
      name: '学生'
    }],
    tooltip: {
      format(node) {
        return JSON.stringify(node, null, 2)
      }
    }
  });
  document.addEventListener('dblclick', function(e){
    if(e.target === this.documentElement) {
      fetch('./g.json').then(res => res.json()).then(data => {
        g.refreshWithGraph({nodes: data.nodes, links: data.edges})
      })
    }
  })
})


