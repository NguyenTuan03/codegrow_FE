'use client';

import { useParams } from 'next/navigation';
import { Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function ToReviewDetail() {
    const { toreviewdetail } = useParams(); // Lấy tham số từ URL
    const courseId = Array.isArray(toreviewdetail) ? toreviewdetail[0] : toreviewdetail;

    const courseDetails: Record<
        string,
        { title: string; code: string; trainer: string; image: string }
    > = {
        react: {
            title: 'React JS',
            code: 'REACTJS - 312',
            trainer: 'Raj Mishra',
            image: 'data:image/png;base64,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',
        },
        java: {
            title: 'Java Programming',
            code: 'JAVA - 101',
            trainer: 'John Doe',
            image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8QEhUSEhIVFRURFRcVFRUVFxUXGBcVFhUXFxYXFRcaHSggGBomGxUWITEhJSkrMDIuGB8zPTMsNygtLisBCgoKDg0OGhAQGy8lHyYtLTIuKy0tLS0vLS0tLS0tLS0tLS8tLS0tLS0tLS0tLy0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAKgBLAMBEQACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYCBAcDAf/EAEQQAAEDAgMEBgUICgEFAQAAAAEAAgMEEQUSIQYxQWEHEyJRcYE0kaGxwjJCUnJzssHRFCMzQ0RigoOSohYkdKPD8BX/xAAaAQEAAwEBAQAAAAAAAAAAAAAAAwQFAgEG/8QANBEBAAIBAgMGAwcEAwEAAAAAAAECAwQREiExBTIzQVFxE4HwFCJCYZGhwSRSsdEj4fEV/9oADAMBAAIRAxEAPwDr6AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDB0oDmtPz728hc+z3LibxForPnv+zqKTNZt6fyzXbkQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBBF4hL/ANRAwbwXOPIFpH5rN1WX+qw46/nM+22y9p6f0+W89On77pRaSiICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDXr6xkLM7vIcXHuCr6nU00+Pjv8AKPOU2DBbNfhr/wCIjZ+N8sj6l/G7W+dr25AaetZfZlb5sttVf2j69Ijl+rQ11q4sdcFPefr35p9bjJEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEGniWIsgbd2rj8lo3n8hzVTV6zHpq726+ULGm0189to6ecq9TU81bJnebNG88APosHesHFizdo5eO8/dj62hrZMmPR4+GvWfreVnvHCwahrGiwv7uZX0m+PBSI6RHJi7Xy39ZlnE8u1sQOF9CfLh5rql+Lnty/P/Ty1eHluzXbgQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEGji+JNgbfe52jR+J5BUtdrI01N+tp6R/K1pdNOe35R1V/DaCSqeXvcct+07i4/Rb3fgsHSaTJrck5Ms8vOfX8oa2o1GPS0ilI5+n8yn6+sjpYxYDuYwce/wAu8rd1OoxaLDyj2j6/dk4MN9TknefeXlhdK99p5jd7tWDhG07rDvUekwXybZ8/O09I8qwk1OWtN8OLlHnPqlFpKIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICCnV5M9SW97+rHIA2/Mr5DU2tqtbwfnt+k/+vosERg03F+W63QxNY0NaLBosF9Zjx1x0ilY5Q+fveb2m1usqni03WVNj8lr2sA5Ai/rN18trss5dbwz0iYj5cm/pcfw9NvHWYmVvK+sfPCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICCqyx9TWtJ3OkDgeT9PeSvmL0+B2jEz0md/1/7btLfF0cxHlG36f9LUvp2EqG0dKWSl3zZO0Dz+cPXr5r5PtbTzj1E3jpbnHu+h7PzRfFw+ccvksODVvXRAn5Tey/xA3+Y1W/oNV9owxbzjlPuyNZg+DlmI6Tzj2byuqogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDRxbDmzttezm6td3HuPI/gqet0ldTTbpaOkrOl1M4L79YnrH15vTD6gvbleLSM0eD7HDvabb13pcs3rw370cpj+faXOoxxW3FXuz0/17wxxekEsTm8QMzfED/4ea41+njPgtXzjnHu60macWWJj2n2lCbJl2d9vk5Bfxvp8Sxuw+L4ltum3778ml2rw8FfXdZ19KxBAQEBBE7WzPjo53scWubHcOBsQczdx4b1Jije8RKDUzNcVphQthMYqpa2Nkk8j2kPu1z3EGzCRcFXNRjrWm8QytDnyXzRFp3dTWe3BAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEEXje0FLR2659nOFwxozOI77cBzKkpitfohzajHij78scLxSWqjEsUQZG++V0rrucASLhjN2o4uXl6cM7T1MeW2SsWrHL80ozNbtEE8hYeq5XCbn5hYCQbajceOu8eHJczWJmJnq9i0xG0MajNlIaNSLC50udLnw3+S8yxaaTw9f8AbrHtFomzxw2hbAwMGp3ud3nv8OSh0ulrpsfBX5z6yk1GotnvxT8vZtWVlAxe24IBIvxFrjwuCEJVPaPE67Di2XO2ogc7K4Pa1r2ngMzABrY2NuCsY6UycukqOoy5cG1usLLhtdHURMmjPZkb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',
        },
        python: {
            title: 'Python Basics',
            code: 'PYTHON - 202',
            trainer: 'Alice Smith',
            image: 'data:image/png;base64,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',
        },
    };

    const reviews = [
        {
            id: 1,
            name: 'Emma Pérez',
            date: 'December 8, 2019',
            rating: 5,
            comment:
                'Coach Raj is the best trainer I have had. I lost 10 kids in two months, he really knows his stuff. Great work ethic, extremely motivating, always positive...',
            avatar: '/avatars/emma.png',
        },
        {
            id: 2,
            name: 'John Smith',
            date: 'January 15, 2020',
            rating: 4,
            comment:
                'The training sessions were great, but I wish there was more focus on advanced topics. Overall, a good experience.',
            avatar: '/avatars/john.png',
        },
        {
            id: 3,
            name: 'Alice Johnson',
            date: 'March 22, 2021',
            rating: 5,
            comment:
                'Amazing trainer! Raj helped me achieve my fitness goals in just a few months. Highly recommend!',
            avatar: '/avatars/alice.png',
        },
    ];

    const course =
        courseId && courseId in courseDetails
            ? courseDetails[courseId]
            : { title: '', code: '', trainer: '', image: '' };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            {/* Header with Background */}
            <div
                className="relative h-48 rounded-lg overflow-hidden mb-8"
                style={{
                    backgroundImage: `url(${course.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="text-center text-white">
                        <h1 className="text-4xl font-bold">{course.title}</h1>
                        <h2 className="text-lg text-gray-300">{course.code}</h2>
                    </div>
                </div>
            </div>

            {/* Trainer Profile */}
            <div className="border-b pb-6 mb-6">
                <div className="flex items-start gap-6">
                    <Avatar>
                        <AvatarImage src="/avatars/trainer.png" alt={course.trainer} />
                        <AvatarFallback>{course.trainer?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="text-2xl font-bold">{course.trainer}</h3>
                        <p className="text-gray-600 italic mb-4">
                            My clients describe my training style as motivating and life-changing.
                        </p>
                        <div className="text-gray-500 mb-1">San Francisco, CA</div>
                        <div className="text-gray-500 mb-1">Joined April 2021</div>
                        <div className="font-bold">$0 (12)</div>
                    </div>
                </div>
            </div>

            {/* Reviews */}
            <div>
                <h3 className="text-xl font-bold mb-4">{reviews.length} Reviews</h3>
                {reviews.map((review) => (
                    <div key={review.id} className="border-b pb-6 mb-6">
                        <div className="flex items-start gap-4">
                            <Avatar>
                                <AvatarImage src={review.avatar} alt={review.name} />
                                <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="flex">
                                        {[...Array(review.rating)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className="w-4 h-4 fill-yellow-400 text-yellow-400"
                                            />
                                        ))}
                                    </div>
                                    <span className="font-bold">{review.rating}.0</span>
                                </div>
                                <p className="mb-2">{review.comment}</p>
                                <div className="flex items-center gap-2 text-gray-500">
                                    <span className="font-medium">{review.name}</span>
                                    <span>{review.date}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
