## Big Q's about code base:

### Why is this solution appropriate?
My approach for this application was to follow a smart container, dumb children paradigm. I decided
  to put all my state logic in the container component, aside from one case, to ensure a one way
  flow of data from parent to children. One challenge I've often encountered is when a component
  is tied to a very specific use case and expects to be used only for that case, this makes it 
  very difficult to reuse in other contexts. Additionally, when multiple components have 
  their own state, it's difficult to keep them all in sync. At the core, this is the philosophy 
  behind redux. 

### How would you handle large datasets on the client?
One thing I would like to implement in an application with larger datasets would be pagination.
This would also help to improve the speed and efficiency of the application, as pagination would 
help keep the payload from the server small. 

### What could be potential user experience challenges in the future?
One potential user experience challenge I could see is if there were thousands of text elements 
to render. Aside from the server response time for such a large payload, users would have an 
incredibly long list to navigate through. A lazy loading solution to incrementally load data
as the user scrolls might be a good solution. 

### How would you make this accessible?
One thing to do to ensure the application is accessible, is to consider the tab flow of elements, 
making sure that there is a thoughtful and clear way to navigate from beginning to end of the application. 
Additionally, ensuring that you have clear, descriptive alt and aria tags that allow screen readers or other 
accessibility tools to deliver content to the user is important. 

### What would you change if you had more time to work on it?
I had some challenges with rendering all the nested connections in the drawer. If
  I had more time to continue working on this challenge, I would like to have found an elegant 
  solution using recursion to render a nodes connections, as well as all of those connections' 
  children. As I mentioned in my answer about the appropriateness of my solution, ideally I would 
  love to have been able to implement redux as well. However, I did get a chance to show off my
  experience using react hooks for state management. I would also like to have moved
all my types into separate files to keep my components less cluttered.
  


