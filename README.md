# upshot
*noun*  
the final or eventual outcome or conclusion of a discussion, action, or series of events.

## Models

User
Project
Issue
Comment
Attachment

## Routes

Auth
/api/auth/signup
/api/auth/login
/api/auth/logout

Users
/api/users
/api/users/:id
/api/users/:id/update
/api/users/:id/update-avatar
/api/users/:id/remove-avatar

Projects
/api/projects
/api/projects/create
/api/projects/:id
/api/projects/:id/update
/api/projects/:id/delete

Issues
/api/issues
/api/issues/create
/api/issues/:id
/api/issues/:id/comment
/api/issues/:id/follow
/api/issues/:id/unfollow
/api/issues/:id/takeover
/api/issues/:id/release
/api/issues/:id/assign
/api/issues/:id/update
/api/issues/:id/delete
/api/issues/:id/add-attachment
/api/issues/:id/remove-attachment
