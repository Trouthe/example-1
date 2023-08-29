import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tabs = [0, 1, 2];
  activeTab = 0;
  progress = 0;
  progressInterval: any;
  progressDuration = 10000; // in milliseconds

  ngOnInit() {
    this.startProgressBar();
  }

  selectTab(index: number) {
    this.activeTab = index;
    clearInterval(this.progressInterval); // Clear the current interval
    this.progress = 0; // Reset progress when a tab is clicked
  }

  startProgressBar() {
    this.progress = 0; // Start the progress from 0
    clearInterval(this.progressInterval); // Clear the current interval
    const steps = 2500; // Number of steps to reach 100%
    const stepDuration = this.progressDuration / steps;

    let step = 0;

    this.progressInterval = setInterval(() => {
      if (step >= steps) {
        clearInterval(this.progressInterval); // Clear interval when progress completes
        this.switchToNextTab();
      } else {
        this.progress = (step / steps) * 100;
        step++;
      }
    }, stepDuration);
  }

  switchToNextTab() {
    this.activeTab = (this.activeTab + 1) % this.tabs.length;
    this.startProgressBar();
  }
}
