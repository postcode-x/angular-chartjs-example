import { Component, Input, OnInit } from '@angular/core';
import { FeaturesService } from '../services/features.service';

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.css']
})
export class PlotComponent implements OnInit {

  public loading: boolean = true;
  public titleText : string = "";

  public chartOptions = {
    hover: {
      mode: 'point' as const,
      animationDuration: 0
    },
    scaleShowVerticalLines: false,
    responsive: true, 
    legend : {
      labels : {
        fontColor : '#ffffff',
        boxWidth: 20 
      }
    },
    scales: {
      xAxes: [{
          
          type: 'linear',
          position: 'bottom',
          gridLines: {
            display: false,
            color: '#f2f2f2'
          },
          ticks:{
            fontColor: "#FFFFFF",
            fontSize: 10
          },
      }],
      yAxes: [{
        gridLines: {
          display: false,
          color: '#f2f2f2'
        },
        ticks:{
          fontColor: "#FFFFFF",
          fontSize: 10,
          stepSize: 0,
          min: 0,
          max: 1,
          callback: function(value: any, index: any, values: any) {return value}
          }
    }]
    },
    tooltips: {
      displayColors: false,
      position: "nearest",
      mode: "nearest" as const,
      bodyAlign: "center" as const,
      titleAlign: "center" as const,
      intersect: true,
      callbacks: {}
    },
    onClick: function (event : any, array: any){
        if(array.length>0){
          if(array[0]._datasetIndex == 1){
            var song_id = array[0]._chart.config.data.datasets[1].data[array[0]._index].song_id;
            window.open('https://open.spotify.com/track/'+song_id, '_blank');
          }
        }
    },
    animation: {
      duration: 0 // general animation time
    },
    responsiveAnimationDuration: 0 // animation duration after a resize

  };

  public lineData = [] as any;
  public scatterData = [] as any;

  public chartData = [
    {label: 'Average', fill: false, pointRadius: 0.5, pointHoverRadius: 4, lineWidth: 2, data: this.lineData, type: 'line'},
    {label: 'Song', pointRadius: 0.5, pointHoverRadius: 4, data: this.scatterData, type: 'scatter'}];

  private plotdata = [] as any;

  @Input() featureName! : string;
  @Input() featureTitle! : string;
  @Input() featureDefinition! : string;
  @Input() featureTrend! : string;

  constructor(private spotifyFeatures: FeaturesService) { }

  ngOnInit(): void {

    this.titleText = this.featureTitle;

    var step : number = 0;
    var max : number = 1;
    var min : number = 0;
    var thisFeatureName = this.featureName;
    var fontsize = 10;

    switch(thisFeatureName){
      case 'danceability': 
      case 'energy':
      case 'speechiness':
      case 'acousticness':
      case 'instrumentalness':
      case 'liveness':
      case 'valence':
        step = 0.25;
        break;
      case 'loudness':
        max = 0;
        min = -20;
        step = 5;
        break;
      case 'key_center':
          max = 10;
          min = 0;
          step = 1;
          fontsize = 9;
        break;
      case 'mode':
        max = 1;
        min = 0;
        step = 1;
        break;
      case 'tempo':
        max = 200;
        min = 50;
        step = 25;
        break;
      case 'popularity':
        max = 100;
        min = 0;
        step = 25;
        break;
      case 'time_signature':
        max = 6;
        min = 1;
        step = 1;
        break;
      case 'duration_ms':
        max = 400;
        min = 100;
        step = 100;
        break;
      default:
        break;
    }

    const keyLabels = ['C','C#', 'D','Eb', 'E','F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
    const modeLabels = ['Minor', 'Major'];
    
    this.chartOptions.scales.yAxes[0].ticks.min = min;
    this.chartOptions.scales.yAxes[0].ticks.max = max;
    this.chartOptions.scales.yAxes[0].ticks.fontSize = fontsize;
    this.chartOptions.scales.yAxes[0].ticks.stepSize = step;
    
    this.chartOptions.scales.yAxes[0].ticks.callback = function(value: any, index: any, values: any) {
        
        if(thisFeatureName == 'key_center'){
          return keyLabels[value]};
        if(thisFeatureName == 'mode'){
          return modeLabels[value]};
        if(thisFeatureName == 'time_signature'){
          return value+'/4'};

        return value;
  
    }

    this.chartOptions.tooltips.callbacks = {

      label: function(tooltipItem: any, data: any) {

        var feature_name = data.datasets[1].data[tooltipItem.index].feature_name;
        var song_name = data.datasets[1].data[tooltipItem.index].song_name;
        var artist = data.datasets[1].data[tooltipItem.index].artist;

        if (tooltipItem.datasetIndex == 1){

          return artist + ' - ' + song_name  ;

        }else{
          
          var currentLabel = tooltipItem.yLabel;
          
          if(thisFeatureName == 'key_center'){
            currentLabel = keyLabels[tooltipItem.yLabel.toFixed(0)]};
          if(thisFeatureName == 'mode'){
            currentLabel = modeLabels[tooltipItem.yLabel.toFixed(0)]};
          if(thisFeatureName == 'time_signature'){
            currentLabel = tooltipItem.yLabel.toFixed(0)+'/4'};

          return feature_name + ': ' + currentLabel + ' on average';

        }
        
      },
      title: function(tooltipItem: any, data: any){

        var feature_name = data.datasets[1].data[tooltipItem[0].index].feature_name;

        if (tooltipItem[0].datasetIndex == 1){

          var currentLabel = tooltipItem[0].yLabel;

          if(thisFeatureName == 'key_center'){
            currentLabel = keyLabels[tooltipItem[0].yLabel]};
          if(thisFeatureName == 'mode'){
            currentLabel = modeLabels[tooltipItem[0].yLabel]};
          if(thisFeatureName == 'time_signature'){
            currentLabel = tooltipItem[0].yLabel+'/4'};

        return feature_name + ': ' + currentLabel + ' - Year: ' + tooltipItem[0].xLabel ;

        }else{

          return 'Year '+ tooltipItem[0].xLabel;

        }  
      }
    }

    let lastResponseData = {} as any;

    this.spotifyFeatures.responseData.subscribe((res: {}) => {
      
      lastResponseData = res;
      this.loading = lastResponseData.isLoading; // (LOADING => NOT HIDDEN) 
      
      if (!this.loading) {

        console.log(lastResponseData.plotData);

        this.plotdata = lastResponseData.plotData;

        for (var i = 0; i < this.plotdata.length; i++) {

          let currentYear = this.plotdata[i].year;
          let currentData = this.plotdata[i].data;
          let average = 0;
          let repeatedFilter = [] as any;

          for (var j = 0; j < currentData.length; j++) {

            var feature_value = parseFloat(currentData[j][this.featureName]);

            if (this.featureName == 'duration_ms') {
              feature_value = feature_value / 1000;
            };

            average += feature_value;
            if (!repeatedFilter.includes(feature_value.toFixed(2)) && this.getRandomNumber(1, 100) > 75) {

              repeatedFilter.push(feature_value.toFixed(2));

              this.chartData[1].data.push({
                x: currentYear,  // year
                y: feature_value.toFixed(2), // feature value
                artist: currentData[j]['artist'],
                song_name: currentData[j]['song_name'],
                song_id: currentData[j]['song_id'],
                feature_name: this.featureTitle
              });

            }

          }

          this.lineData.push({
            x: currentYear,  // year
            y: (average / currentData.length).toFixed(2), // feature value
          })

        }

      }

    });

  }

  openRandomSong() { 

    if (!this.loading && this.chartData[1].data.length > 0){
      let randomIndex = this.getRandomNumber(0, this.chartData[1].data.length); 
      window.open('https://open.spotify.com/track/'+this.chartData[1].data[randomIndex].song_id, '_blank');
    }

    return false;
  }

  getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }

}


