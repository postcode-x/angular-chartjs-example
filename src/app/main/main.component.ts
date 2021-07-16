import { Component, OnInit } from '@angular/core';
import { FeaturesService } from '../services/features.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public featureObjectArray = [] as any;

  public featureList = [
    'danceability',
    'energy',
    'key_center',
    'loudness',
    'mode',
    'speechiness',
    'acousticness',
    'instrumentalness',
    'liveness',
    'valence',
    'tempo',
    'duration_ms',
    'time_signature',
    'popularity'];

  public featureDefinitionMap = new Map<string, string>([
    ['danceability', 'Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.'],
    ['energy', 'Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.	'],
    ['key_center', 'The key the track is in. Integers map to pitches using standard Pitch Class notation . E.g. 0 = C, 1 = C♯/D♭, 2 = D, and so on.'],
    ['loudness', 'The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). Values typical range between -60 and 0 db.	'],
    ['mode', 'Mode indicates the modality (major or minor) of a track, the type of scale from which its melodic content is derived. Major is represented by 1 and minor is 0.	'],
    ['speechiness', 'Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value. Values above 0.66 describe tracks that are probably made entirely of spoken words. Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 0.33 most likely represent music and other non-speech-like tracks.	'],
    ['acousticness', 'A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic.'],
    ['instrumentalness', 'Predicts whether a track contains no vocals. “Ooh” and “aah” sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly “vocal”. The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content. Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0.	'],
    ['liveness', 'Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 0.8 provides strong likelihood that the track is live.	'],
    ['valence', 'A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).	'],
    ['tempo', 'The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.	'],
    ['duration_ms', 'The duration of the track in seconds, although the Spotify API originally provides this value in milliseconds.'],
    ['time_signature', 'An estimated overall time signature of a track. The time signature (meter) is a notational convention to specify how many beats are in each bar (or measure).	'],
    ['popularity', 'The popularity of the track. The value will be between 0 and 100, with 100 being the most popular. The popularity of a track is a value between 0 and 100, with 100 being the most popular. This value is calculated by algorithm and is based, in the most part, on the total number of plays the track has had and how recent those plays are. '],
  ]);

  public featureTitleMap = new Map<string, string>([
    ['danceability', 'Danceability'],
    ['energy', 'Energy'],
    ['key_center', 'Key Center'],
    ['loudness', 'Loudness (dB)'],
    ['mode', 'Mode'],
    ['speechiness', 'Speechiness'],
    ['acousticness', 'Acousticness'],
    ['instrumentalness', 'Instrumentalness'],
    ['liveness', 'Liveness'],
    ['valence', 'Valence'],
    ['tempo', 'Tempo (bpm)'],
    ['duration_ms', 'Duration (s)'],
    ['time_signature', 'Time signature'],
    ['popularity', 'Popularity'],
  ]);


  public featureTrendMap = new Map<string, string>([
    ['danceability', 'According to the trendline, average danceability has been steadily going up since the 60\'s.'],
    ['energy', 'The average trendline shows that the energy feature had a maximum around the year 2010 and it has been declining since.'],
    ['key_center', 'Key Center average is right at the middle (around F and F#), meaning that there aren\'t prefered keys.'],
    ['loudness', 'Loudness hit a maximum around 2009-2010 and it has been roughly stable since that date.'],
    ['mode', 'Interestingly enough, there is a clear trend going from Major to Minor modes on average since the 60\'s. Maybe popular songs are getting \'sadder\' lately?'],
    ['speechiness', 'Average speechiness has been slowly increasing over time.'],
    ['acousticness', 'Average acousticness had a historical low roughly in 2011-2012, and it has been going up a lot since that date. During the 60\'s acousticness on average was really high.'],
    ['instrumentalness', 'Average instrumentalness has been going down since the 60\'s.'],
    ['liveness', 'Average liveness has been going down slowly over time, but not significantly.'],
    ['valence', 'Average valence has been slowly declining since the 60\'s, which is consistent with other related features like energy and mode.'],
    ['tempo', 'Average tempo has had a sweet spot around 120 bpm for years now.'],
    ['duration_ms', 'In the 90\'s songs were longer. Currently songs are getting shorter like in the 60\'s.'],
    ['time_signature', 'Average time signature is 4/4, no surprises here.'],
    ['popularity', 'More recent songs are always more popular, but there are a variety of spikes between the 60\'s-80\'s and during the mid 2000s.'],
  ]);

  constructor(private spotifyFeatures: FeaturesService) {

    this.spotifyFeatures.processFeatures();

    for (let i = 0; i < this.featureList.length; i++) {

      this.featureObjectArray.push({
        name: this.featureList[i],
        title: this.featureTitleMap.get(this.featureList[i]),
        definition: this.featureDefinitionMap.get(this.featureList[i]),
        trend: this.featureTrendMap.get(this.featureList[i])
      })

    }

  }

  ngOnInit(): void {
  }

}
