# Deployment

## Production

Deployments to production can be initiated by anyone, as long as the correct
PR is made.

To create a new version to deploy you must follow the steps outlined in this 
guide.

### Step 1: Bump the version

On master update the version in `package.json` and commit, either directly to 
master or with another PR.

### Step 2: Open a Production PR

Open a PR with `prod` as the base from `master`, or by using [this link](https://github.com/numo-labs/isearch-ui/compare/prod...master?expand=1).

> Try to keep the version name in the title.

#### Step 3 (Optional): Add an appropriate GIF

![Like this](http://i.giphy.com/VJV6BhG24PFVC.gif)

### Following should be done when being merged.

#### Step 4: Review and Merge

The PR should be reviewed and merged, as soon as the PR is merged into the branch
`prod` a deployment will be triggered in codeship.

#### Step 5: Create and tag a release

Navigate to [Releases on Github](https://github.com/numo-labs/isearch-ui/releases/new)
and create a new draft release from master with the tag name as the version from
`package.json` updated in step 1 with a `v` prefixed. Eg. `v2.0.0`.

In the body of the release add:

```md
Changelog: <Insert link to PR>
```

#### Step 6: Check deployment is successful

Check that the deployment is successful, if so then this needs to be communicated
to the rest of the team via slack.

If the deployment introduces a regression and needs to be reverted, open the 
release PR and *Revert* the PR, this will create a new PR that once merged will
release the reverted version.

