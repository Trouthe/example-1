import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isScrolled = false;
  scrollDirection: 'up' | 'down' = 'up';
  lastScrollPosition = 0;
  showNav = false;
  isScrollingLocked = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScrollPosition = window.scrollY; // Get the current scroll position

    if (currentScrollPosition === 0) {
      // If at the top of the page reset isScrolled to false, making the navbar transparent
      console.log(this.isScrolled);
      
      setTimeout(() => {
        this.isScrolled = false;
      }, 100);
    } else if (currentScrollPosition <= 300) {
      // If within the first 250px of scrolling apply fade-in class for the gradual background color change
      setTimeout(() => {
        this.isScrolled = true;
      }, 50);
    } else {
      this.scrollDirection = currentScrollPosition > this.lastScrollPosition ? 'down' : 'up';
      // Determine the scroll direction based on the current and last scroll positions
      this.isScrolled = true; // Apply the regular scrolled class for immediate background change
    }

    this.lastScrollPosition = currentScrollPosition; // Update the last scroll position for the next iteration
  }

  toggleNav() {
    this.showNav = !this.showNav;
  }

  toggleScrollingLock() {
    this.isScrollingLocked = !this.isScrollingLocked;
    if (this.isScrollingLocked) {
      document.body.style.overflow = 'hidden'; // Disable scrolling
    } else {
      document.body.style.overflow = ''; // Enable scrolling
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
