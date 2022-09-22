import { Controller, Get } from '@nestjs/common';
import * as git from 'git-last-commit';
import { DateTime } from 'luxon';

@Controller({ path: 'admin' })
export class AppController {
  @Get('/healthcheck')
  async healthCheck() {
    const commit: git.Commit = await new Promise((resolve, reject) => {
      git.getLastCommit((err, commit) => {
        resolve(commit);

        if (err) {
          reject(false);
        }
      });
    });

    return {
      author: commit.author.name,
      subject: commit.subject,
      commitedOn: DateTime.fromSeconds(Number(commit.committedOn)).toFormat('dd/mm/yyyy hh:mm:ss'),
    };
  }
}
