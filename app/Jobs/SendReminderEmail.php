<?php

namespace App\Jobs;

use App\Jobs\Job;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Contracts\Mail\Mailer;

use App\User;

class SendReminderEmail extends Job implements ShouldQueue
{
    use InteractsWithQueue, SerializesModels;

    protected $user;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct()
    {
        //$this->user = $user;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle(Mailer $mailer)
    {
        //$mailer->send('emails.reminder', ['user' => $this->user], function ($m) {
           var_dump('job');
           // $m->from('hello@app.com', 'Your Application');

            //$m->to($this->user->email, $this->user->firstname)->subject('Your Reminder!');
        //});

        //$this->user->reminders()->create(...);

    }
}
