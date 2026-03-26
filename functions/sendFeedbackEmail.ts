import { createClientFromRequest } from 'npm:@base44/sdk@0.7.1';

Deno.serve(async (req) => {
    console.log('=== sendFeedbackEmail function started ===');
    
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        return new Response(null, {
            status: 204,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
        });
    }
    
    try {
        console.log('Creating base44 client...');
        const base44 = createClientFromRequest(req);
        
        console.log('Parsing request body...');
        const body = await req.json();
        console.log('Body received:', body);
        
        const feedbackData = body.feedbackData;
        
        if (!feedbackData) {
            console.error('No feedbackData in body');
            return new Response(JSON.stringify({ 
                success: false, 
                error: 'Missing feedback data' 
            }), { 
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        
        console.log('Feedback data:', feedbackData);
        console.log('Preparing email...');
        
        const ratingStars = '⭐'.repeat(feedbackData.rating || 0);
        const emailBody = `
New Feedback Received from ${feedbackData.location}

Name: ${feedbackData.name}
Email: ${feedbackData.email}
Phone: ${feedbackData.phone || 'Not provided'}
Location: ${feedbackData.location}
Rating: ${ratingStars} (${feedbackData.rating || 'Not rated'}/5)

Message:
${feedbackData.message}

---
This feedback was submitted via The Falafel Guy website.
Submission time: ${new Date().toLocaleString('en-ZA', { timeZone: 'Africa/Johannesburg' })}
        `.trim();

        console.log('Attempting to send email...');
        
        const result = await base44.asServiceRole.integrations.Core.SendEmail({
            to: 'hello@thefalafelguy.co.za',
            subject: `New Feedback from ${feedbackData.name} - ${feedbackData.location}`,
            body: emailBody,
            from_name: 'The Falafel Guy Website'
        });
        
        console.log('Email sent successfully!', result);

        return new Response(JSON.stringify({ 
            success: true, 
            message: 'Email sent successfully'
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
        
    } catch (error) {
        console.error('=== ERROR OCCURRED ===');
        console.error('Error type:', error.constructor.name);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
        
        return new Response(JSON.stringify({ 
            success: false, 
            error: error.message || 'Failed to send email',
            errorType: error.constructor.name
        }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
});