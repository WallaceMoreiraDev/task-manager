export default function Feedback({ feedback }) {
    if (!feedback || !feedback.info) return null;

    return (
        <div className={feedback.info === 'success' ? "feedback-success" : "feedback-error"}>
            <p>{feedback.message}</p>
        </div>
    );
}
